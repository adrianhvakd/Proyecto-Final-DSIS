import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Response } from 'express';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
  @Get('')
  async index(@Res() res:Response,
        @Query('paginaActual') actual=1, 
        @Query('itemsPaginas') items=2){

    const clientes = await this.clienteService.getAllPagination(items,actual)

    let paginacion = {
      paginas:Array(),
      paginaActual:actual,
      siguiente:true,
      anterior:true,
      itemPaginas:items,
      paginaAnterior:Number(actual)-1,
      paginaSiguiente:Number(actual)+1,
    }
    
    paginacion.siguiente = clientes.count/2==paginacion.paginaActual;
    paginacion.anterior=paginacion.paginaActual==1;
    for(let i = 0; i < clientes.count / 2; i++)
      paginacion.paginas.push({
        paginas:i+1, 
        activo:paginacion.paginaActual == (i+1)});

    return res.render('cliente/index',
      {
        title:'Lista Clientes',
        clientes:clientes,
        //paginas:paginas,
        paginacion,
      });
  }
}
