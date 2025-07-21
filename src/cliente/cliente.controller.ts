import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Response } from 'express';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
  @Get('')
  async index(@Res() res:Response){
    const clientes = await this.clienteService.getAllPagination(5,0)
    return res.render('cliente/index',
      {
        title:'Lista Cliente',
        clientes:clientes
      });
  }
}
