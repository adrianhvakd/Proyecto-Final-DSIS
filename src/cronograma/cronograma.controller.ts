import { Controller, Get, Post, Body, Param, Render, Redirect, Res, Query } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaDto } from './dto/cronograma.dto';
import { Response } from 'express';
import { title } from 'process';
import { Paginate } from 'src/shared/paginate';

@Controller('cronograma')
export class CronogramaController {
  constructor(private readonly service: CronogramaService) {}

  @Get('')
  async index(@Res() res:Response,
    @Query('paginaActual') actual=0,
    @Query('itemPaginas') items=2,
    @Query('buscar') buscar = ''){
    const cronogramas = await  
    this.service.getAllPagination(items,actual,buscar);        
    return res.render('cronograma/index',{
        title: 'Lista de Cronogramas',
        cronogramas: cronogramas,
        buscar: buscar,
        paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, cronogramas.count),
    });
  }

  @Post()
  @Redirect('/cronograma')
  create(@Body() dto: CronogramaDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post('editar/:id')
  async update(@Param('id') id: number, @Body() updateCronogramaDto: any, @Res() res: Response) {
    const result = await this.service.update(id, updateCronogramaDto);
    return result ? res.redirect('/cronograma') : {title: 'error al insertar'};
  }

  @Get('eliminar/:id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const result = await this.service.remove(id);
    return result ? res.redirect('/cronograma') : {title: 'error al eliminar'};
  }
}
