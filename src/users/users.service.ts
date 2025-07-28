import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findOne(username: string){
    return await this.usersRepository.findOne({ where: { username } });
  }

  public async findById(id: number){
    return await this.usersRepository.findOne({ where: { id } });
  }

  public async create(createUserDto){
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }
  async findByUsername(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  public async getAllPagination(limit:number,offset:number,buscar:string){
        let where: FindOptionsWhere<User>[] = [];;
        const buscarLower = buscar?.toLowerCase();
        const isBooleanSearch = buscarLower === 'si' || buscarLower === 'no';
        const booleanValue = isBooleanSearch ? buscarLower === 'si' : undefined;
        if (buscar && buscar.trim() !== '') {
            if (isBooleanSearch) {
                where.push({ isActive: booleanValue });
            } else {
                where = [
                { names: ILike(`%${buscar}%`) },
                { lastNames: ILike(`%${buscar}%`) },
                { email: ILike(`%${buscar}%`) },
                { username: ILike(`%${buscar}%`) },
                { role: ILike(`%${buscar}%`) },
                ];
            }
        }
        const options: any = {
            where: where.length ? where : undefined,
        };

        if (!buscar || buscar.trim() === '') {
            options.take = limit;
            options.skip = offset;
        }
        const [data,cantidad] = await this.usersRepository.findAndCount(options);
        //console.log();
        return {
            result:data,
            count:cantidad
        }
    }

  public async edit(user,id){
        let respuesta = await this.usersRepository.update({id:id},user);
        return respuesta.affected??0>=1?true:false
  }

  public async delete(id: number): Promise<boolean> {
        let respuesta = await this.usersRepository.softDelete(id);
        return (respuesta.affected ?? 0) >= 1;
  }
}