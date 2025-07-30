import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Query, UseGuards } from '@nestjs/common';
import { PuestosService } from './puestos.service';
import { title } from 'process';
import { Response } from 'express';
import { Paginate } from 'src/shared/paginate';
import { AuthGuard } from '@nestjs/passport';
import { Factura } from 'src/shared/facturar';
import { FacturaPDF } from 'src/shared/facturaPDF';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Reporte } from 'src/shared/reporte';
import { printPDF } from 'src/shared/printPDF';
import { Print } from 'src/shared/print';



@Controller('puestos')
export class PuestosController {
  constructor(private readonly puestosService: PuestosService) {}
  @UseGuards(AuthGuard('jwt'))
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
  @Get('ventas')
  async renderpuestos(@Res() res:Response, @Query('paginaActual') actual=0, @Query('itemPaginas') items=2, @Query('buscar') buscar = ''){
    const puestos = await this.puestosService.getAll();
    const puestospag = await this.puestosService.getAllPagination(items,actual,buscar);   
    res.render('ventas',{
      title: 'Mapa del recorrido',
      puestos,
      puestospag,
      buscar,
      paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, puestospag.count),
    });
  }


  @Post('venta/:id')
  async vender(
  @Param('id') id: number,
  @Body() updatePuestoDto: any,
  @Res() res: Response,
  ) {
    updatePuestoDto.factura = id * 100;

    const result = await this.puestosService.update(id, updatePuestoDto);
    const cliente = await this.puestosService.getbyId(id);

    const printReport: Factura = new FacturaPDF();
    const nombre = `factura${updatePuestoDto.factura}.pdf`;
    printReport.generarFactura(cliente, nombre);

    const filePath = join(process.cwd(), 'reports', nombre);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${nombre}"`,
    });

    const fileStream = createReadStream(filePath);
    return fileStream.pipe(res);
  }

  @Get('ventasAdm')
  async renderventas(@Res() res:Response,
    @Query('paginaActual') actual=0,
    @Query('itemPaginas') items=2,
    @Query('buscar') buscar = ''){
    const cronogramas = await  
    this.puestosService.getVentas(items,actual,buscar);        
    return res.render('puestos/ventasAdm',{
        title: 'Lista de Cronogramas',
        cronogramas: cronogramas,
        buscar: buscar,
        paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, cronogramas.count),
    });
  }
  @Post('anularventa')
  async anularventa(@Body('id') id: number, @Res() res: Response) {
    const result = await this.puestosService.getbyId(id);

    if (!result) {
      return res.render('puestos/ventasAdm',{ message: 'Puesto no encontrado' });
    }

    result.comprador = null;
    result.codVivienda = null;
    result.factura = null;
    result.disponible = true;

    const updateResult = await this.puestosService.update(id, result);

    if (updateResult) {
      return res.render('puestos/ventasAdm',{ message: 'Venta anulada correctamente' });
    } else {
      return res.render('puestos/ventasAdm',{ message: 'Error al anular la venta' });
    }
  }

  @Get('GenerarPdf')
  async generarPdf(@Res() res:Response){
    const clientes = await this.puestosService.getVentaspdf();
    const printReport:Reporte = new printPDF()
    await printReport.generarReportCliente(clientes.result,'reporte-ventas.pdf')
    const file = createReadStream(join(process.cwd(),'reports/reporte-ventas.pdf'));
    return file.pipe(res);
  }
  @Get('GenerarPrint')
  async generarPrint(@Res() res:Response){
    const clientes = await this.puestosService.getVentaspdf();
    const printReport:Reporte = new Print()
    return res.send(printReport.generarReportCliente(clientes.result,''));
  }
}
