import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>) {
    }
  public async getAllPagination(limit,offset){
    const [datos, cantidad] = await this.clienteRepository.findAndCount({
      take: limit,
      skip: offset,
    })
    return{
      result: datos,
      count: cantidad
    }
  }

  public async getAll(){
    return await this.clienteRepository.find()
  }
  public Getid(id){}
}
