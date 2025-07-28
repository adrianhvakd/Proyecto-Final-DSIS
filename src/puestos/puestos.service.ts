import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puesto } from './entities/puesto.entity';
import { FindOptionsWhere, ILike, Raw, Repository } from 'typeorm';


@Injectable()
export class PuestosService {
  constructor(
    @InjectRepository(Puesto)
    private puestoRepository: Repository<Puesto>
  ) {}
  async create(createPuestoDto) {
    createPuestoDto.disponible == 'true'? createPuestoDto.disponible = true : createPuestoDto.disponible = false;
    const result = await this.puestoRepository.create(createPuestoDto);
    return await this.puestoRepository.save(result);
  }

  async getAll(){
    const result = await this.puestoRepository.find();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} puesto`;
  }

  async update(id: number, updatePuestoDto) {
    updatePuestoDto.disponible == 'true' ? updatePuestoDto.disponible = true : updatePuestoDto.disponible = false;
    return await this.puestoRepository.update(id, updatePuestoDto)
  }

  async remove(id: number) {
    return await this.puestoRepository.softDelete(id);
  }

  public async getAllPagination(limit:number,offset:number,buscar:string){
    let where: FindOptionsWhere<Puesto>[] = [];
    const buscarLower = buscar?.toLowerCase();
    const isBooleanSearch = buscarLower === 'true' || buscarLower === 'false';
    const booleanValue = isBooleanSearch ? buscarLower === 'true' : undefined;
    if (buscar && buscar.trim() !== '') {
      const buscarTrim = buscar.trim();
      const buscarLower = buscarTrim.toLowerCase();
      const isBooleanSearch = buscarLower === 'true' || buscarLower === 'false';
      const booleanValue = buscarLower === 'true';
      
      if (isBooleanSearch) {
        where.push({ disponible: booleanValue });
      } else {
        where = [
          { comprador: ILike(`%${buscarTrim}%`) },
          { codVivienda: ILike(`%${buscarTrim}%`) },
          { ubicacion: ILike(`%${buscarTrim}%`) },
          // Convertimos a texto explícitamente para LIKE, sin Number()
          { precio: Raw(alias => `CAST(${alias} AS CHAR) LIKE '%${buscarTrim}%'`) },
          { numero: Raw(alias => `CAST(${alias} AS CHAR) LIKE '%${buscarTrim}%'`) },
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
    const [data,cantidad] = await this.puestoRepository.findAndCount(options);
    return {
        result:data,
        count:cantidad
    }
  }
}
