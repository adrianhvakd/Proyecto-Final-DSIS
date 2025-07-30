import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puesto } from './entities/puesto.entity';
import { FindOptionsWhere, ILike, IsNull, Not, Raw, Repository } from 'typeorm';
import { IsBoolean } from 'class-validator';


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
  public async getbyId(id){
    const rasult = await this.puestoRepository.findOne({where: {id}});
    return rasult;
  }

  findOne(id: number) {
    return `This action returns a #${id} puesto`;
  }

  async update(id: number, updatePuestoDto) {
    console.log(updatePuestoDto.disponible);
    if( !IsBoolean(updatePuestoDto.disponible)){
      updatePuestoDto.disponible == 'true' ? updatePuestoDto.disponible = true : updatePuestoDto.disponible = false;
    }
    console.log(updatePuestoDto.disponible);
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

  public async getVentas(limit: number, offset: number, buscar: string) {
    let where: FindOptionsWhere<Puesto>[] = [];

    const buscarTrim = buscar?.trim();
    const buscarLower = buscarTrim?.toLowerCase();
    const isBooleanSearch = buscarLower === 'true' || buscarLower === 'false';
    const booleanValue = buscarLower === 'true';

    if (buscarTrim) {
      if (isBooleanSearch) {
        where.push({
          disponible: booleanValue,
          comprador: Not(IsNull())
        });
      } else {
        // Aplicar condición comprador: Not(IsNull()) a cada filtro
        where = [
          { comprador: ILike(`%${buscarTrim}%`) },
          { codVivienda: ILike(`%${buscarTrim}%`) },
          { ubicacion: ILike(`%${buscarTrim}%`) },
          { precio: Raw(alias => `CAST(${alias} AS CHAR) LIKE '%${buscarTrim}%'`) },
          { numero: Raw(alias => `CAST(${alias} AS CHAR) LIKE '%${buscarTrim}%'`) },
        ].map(filtro => ({
          ...filtro,
          comprador: filtro.comprador ?? Not(IsNull())
        }));
      }
    } else {
      // No hay búsqueda: solo mostrar donde comprador no es null
      where = [{ comprador: Not(IsNull()) }];
    }

    // Configuración de opciones: paginar solo si NO hay búsqueda
    const options: any = {
      where
    };
    if (!buscarTrim) {
      options.take = limit;
      options.skip = offset;
    }

    const [data, cantidad] = await this.puestoRepository.findAndCount(options);

    return {
      result: data,
      count: cantidad
    };
  }

  public async getVentaspdf() {
  const where = [{ comprador: Not(IsNull()) }];

  const options: any = { where };

  const [data, cantidad] = await this.puestoRepository.findAndCount(options);

  return {
    result: data,
    count: cantidad
  };
}





}
