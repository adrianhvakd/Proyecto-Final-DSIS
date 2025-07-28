import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Query, UseGuards, Redirect, UseInterceptors } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Paginate } from 'src/shared/paginate';
import { ClienteDto } from './dto/cliente.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UploadedFile } from '@nestjs/common';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async index(@Res() res:Response, @Query('paginaActual') actual=0, @Query('itemPaginas') items=2, @Query('buscar') buscar = ''){
    const clientes = await  
    this.clienteService.getAllPagination(items,actual,buscar);        
    return res.render('cliente/index',{
        title: 'Lista Cliente',
        clientes: clientes,
        buscar: buscar,
        paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, clientes.count),
    });
  }

  @Get('/formcliente')
    form(@Res() res:Response){
      return res.render('cliente/form', {
        title: 'Crear un nuevo cliente',
      }); 
  }

  @Post('')
  async create(@Body() cliente:ClienteDto,@Res() res:Response){
      let respuesta = await this.clienteService.create(cliente)
      return res.redirect(respuesta ? '/cliente' : '/cliente/formcliente');
  }

  @Get('/formedit/:id')
  @Render('cliente/form')
  async formEdit(@Param('id') id: number, @Res() res: Response) {
      let item:ClienteDto | null = await this.clienteService.findById(id);
      return {
        item:item,
        title: 'Editar Cliente',
      };
  }
  //crear -storage
  @Post('/edit/:id')
  async update(@Body() udpatecliente:ClienteDto, @Param('id') id:number, @Res() res:Response){  
    let respuesta = await this.clienteService.edit(udpatecliente,id);
    return res.redirect(respuesta ? '/cliente' : '/cliente/formcliente');       
  }
  @Get('/delete/:id')
  @Redirect('/cliente')
  async delete(@Param('id') id: number) {
      let result = await this.clienteService.delete(id);
  }
  
  @Post('cargar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}${ext}`;
        cb(null, name);
      },
    }),
  }))
  @Redirect('/cliente')
  async cargarClientes(@UploadedFile() file: Express.Multer.File) {
    const result = await this.clienteService.procesarArchivo(file.path);
    return result;
  }
}
