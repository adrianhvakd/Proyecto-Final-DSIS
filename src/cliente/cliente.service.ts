import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { ArchivoProcesador } from 'src/shared/Procesador';
@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>) {
    }
  public async getAllPagination(limit:number,offset:number,buscar:string){
        let where: FindOptionsWhere<Cliente>[] = [];
        const buscarLower = buscar?.toLowerCase();
        const isBooleanSearch = buscarLower === 'true' || buscarLower === 'false';
        const booleanValue = isBooleanSearch ? buscarLower === 'true' : undefined;
        if (buscar && buscar.trim() !== '') {
            if (isBooleanSearch) {
                where.push({ pagoImpuesto: booleanValue });
            } else {
                where = [
                { nombre: ILike(`%${buscar}%`) },
                { apellidos: ILike(`%${buscar}%`) },
                { codVivienda: ILike(`%${buscar}%`) },
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
        const [data,cantidad] = await this.clienteRepository.findAndCount(options);
        //console.log();
        return {
            result:data,
            count:cantidad
        }
  }

  public async getAll(){
    return await this.clienteRepository.find()
  }
  public async create(createUserDto){
      createUserDto.pagoImpuesto = createUserDto.pagoImpuesto === 'true' || createUserDto.pagoImpuesto === true;
      const user = await this.clienteRepository.create(createUserDto);
      return await this.clienteRepository.save(user);
  }

  public async findById(id: number){
    return await this.clienteRepository.findOne({ where: { id } });
  }

  public async edit(user,id){
      user.pagoImpuesto = user.pagoImpuesto === 'true' || user.pagoImpuesto === true;
      let respuesta = await this.clienteRepository.update({id:id},user);
      return respuesta.affected??0>=1?true:false
  }

  public async delete(id: number): Promise<boolean> {
    let respuesta = await this.clienteRepository.softDelete(id);
    return (respuesta.affected ?? 0) >= 1;
  }

  public async procesarArchivo(pathArchivo: string) {
    const procesador = ArchivoProcesador.getInstance();
    const datosProcesados = procesador.leerDatos(pathArchivo);

    for (const fila of datosProcesados) {
      const existe = await this.clienteRepository.findOne({
        where: { codVivienda: fila.codVivienda },
      });

      if (existe) {
        fs.unlinkSync(pathArchivo);
        return {
          mensaje: `Error: ya existe el cliente '${fila.nombre}' con codVivienda '${fila.codVivienda}'.`,
        };
      }
    }

    const clientes = datosProcesados.map((fila) => {
      const cliente = new Cliente();
      cliente.nombre = fila.nombre;
      cliente.apellidos = fila.apellidos;
      cliente.codVivienda = fila.codVivienda;
      cliente.pagoImpuesto = fila.pagoImpuesto.toLowerCase() === 'si';
      return cliente;
    });

    const result = await this.clienteRepository.save(clientes);
    fs.unlinkSync(pathArchivo);

    return result
      ? { mensaje: `Se insertaron ${clientes.length} clientes.` }
      : { mensaje: 'No se insertaron clientes.' };
  }

}
