import { Injectable } from '@nestjs/common';
import { CreateClientesesionDto } from './dto/create-clientesesion.dto';
import { UpdateClientesesionDto } from './dto/update-clientesesion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientesesion } from './entities/clientesesion.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ClientesesionService {
  constructor(
    @InjectRepository(Clientesesion)
    private clienteRepository: Repository<Clientesesion>) {
    }
  public async create(createUserDto){
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.clienteRepository.create(createUserDto);
    return await this.clienteRepository.save(user);
  }
  async findClientByUsername(username){
    return await this.clienteRepository.findOne({ where: { username } });
  }
}
