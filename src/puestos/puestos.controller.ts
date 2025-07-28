import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Query } from '@nestjs/common';
import { PuestosService } from './puestos.service';
import { title } from 'process';
import { Response } from 'express';
import { Paginate } from 'src/shared/paginate';


@Controller('puestos')
export class PuestosController {
  constructor(private readonly puestosService: PuestosService) {}
  @Get('')
  async mapa(@Res() res:Response, @Query('paginaActual') actual=0, @Query('itemPaginas') items=2, @Query('buscar') buscar = ''){
    const puestos = await this.puestosService.getAll();
    const puestospag = await this.puestosService.getAllPagination(items,actual,buscar);   
    res.render('puestos/index',{
      title: 'Mapa del recorrido',
      puestos,
      puestospag,
      buscar,
      paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, puestospag.count),
    });
  }

  @Post('puestosform')
  async create(@Body() createPuestoDto: any, @Res() res: Response) {
    const result = await this.puestosService.create(createPuestoDto);
    return result ? res.redirect('/puestos'): res.redirect('puestos/puestosform');
  }

  @Post('editar/:id')
  async update(@Param('id') id: number, @Body() updatePuestoDto: any, @Res() res: Response) {
    const result = await this.puestosService.update(id, updatePuestoDto);
    return result ? res.redirect('/puestos') : res.redirect(`/puestos/editar/${id}`);
  }

  @Get('delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const result = await this.puestosService.remove(id);
    return result ? res.redirect('/puestos') : res.redirect(`/puestos`);
  }

}
