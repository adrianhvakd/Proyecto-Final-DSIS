import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Raw, Repository } from 'typeorm';
import { CronogramaDto } from './dto/cronograma.dto';
import { Cronograma } from './entities/cronograma.entity';

@Injectable()
export class CronogramaService {
  constructor(
    @InjectRepository(Cronograma)
    private readonly repo: Repository<Cronograma>,
  ) {}

  create(dto: CronogramaDto) {
    const cronograma = this.repo.create(dto);
    return this.repo.save(cronograma);
  }

  findAll() {
    return this.repo.find({ order: { fecha_inicio: 'ASC' } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: CronogramaDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.softDelete(id);
  }


  public async getAllPagination(limit:number,offset:number,buscar:string){
    let where: FindOptionsWhere<Cronograma>[] = [];
    const buscarTrim = buscar.trim();
    if (buscar && buscar.trim() !== '') {
      where = [
      { nombre_evento: ILike(`%${buscarTrim}%`) },
      { fecha_inicio: Raw(alias => `CAST(${alias} AS CHAR) LIKE '%${buscarTrim}%'`) },
      { fecha_fin: Raw(alias => `CAST(${alias} AS CHAR) LIKE '%${buscarTrim}%'`) },
      { fase: ILike(`%${buscarTrim}%`) },
      { descripcion: ILike(`%${buscarTrim}%`) },
      ];
    }
    const options: any = {
        where: where.length ? where : undefined,
    };

    if (!buscar || buscar.trim() === '') {
        options.take = limit;
        options.skip = offset;
    }
    const [data,cantidad] = await this.repo.findAndCount(options);
    //console.log();
    return {
        result:data,
        count:cantidad
    }
  }
}
