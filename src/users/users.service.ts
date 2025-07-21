import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

}