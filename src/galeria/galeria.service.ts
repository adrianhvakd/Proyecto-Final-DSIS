import { Injectable } from '@nestjs/common';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { UpdateGaleriaDto } from './dto/update-galeria.dto';
import { Galeria } from './entities/galeria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Raw, Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class GaleriaService {
  constructor(
    @InjectRepository(Galeria)
    private readonly galeriaRepository: Repository<Galeria>,
  ){}
  public async create(createGaleriaDto) {
    const create = await this.galeriaRepository.create(createGaleriaDto);
    const save = await this.galeriaRepository.save(create);
    return save;
  }

  public async findAll() {
    return await this.galeriaRepository.find();
  }

  async findOne(id: number): Promise<Galeria | null> {
    return await this.galeriaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateGaleriaDto: Partial<CreateGaleriaDto>): Promise<Galeria | null> {
    // Primero verificar si existe
    const existente = await this.findOne(id);
    if (!existente) {
      return null;
    }

    // Actualizar solo los campos proporcionados
    await this.galeriaRepository.update(id, updateGaleriaDto);
    
    // Retornar el registro actualizado
    return await this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const galeria = await this.galeriaRepository.findOne({ where: { id } });

    if (!galeria) return false;

    // Ruta completa al archivo de imagen
    const imagePath = path.join(__dirname, '..', '..', 'public', 'images', galeria.imagen);

    // Eliminar imagen del disco si existe
    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (err) {
      console.error('No se pudo eliminar la imagen:', err);
      // puedes seguir si falla, pero podrías manejarlo mejor según el caso
    }

    await this.galeriaRepository.delete(id);
    return true;
  }

  public async getAllPagination(limit:number,offset:number,buscar:string){
    let where: FindOptionsWhere<Galeria>[] = [];
    const buscarTrim = buscar.trim();
    if (buscar && buscar.trim() !== '') {
      where = [
      { titulo: ILike(`%${buscarTrim}%`) },
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
    const [data,cantidad] = await this.galeriaRepository.findAndCount(options);
    //console.log();
    return {
        result:data,
        count:cantidad
    }
  }
}
