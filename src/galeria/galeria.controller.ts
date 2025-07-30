import { Controller, Get, Post, Body, Patch, Param, Delete, Render, UseGuards, Res, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { UpdateGaleriaDto } from './dto/update-galeria.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Paginate } from 'src/shared/paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path'; // Cambio aquí: usar import * as path

@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}
  
  @Get()
  async rendergaleria(@Res() res: Response,
      @Query('paginaActual') actual = 0,
      @Query('itemPaginas') items = 3,
      @Query('buscar') buscar = '') {
      const fraternidades = await  
      this.galeriaService.getAllPagination(items, actual, buscar);        
      return res.render('galeria', {
          title: 'Lista de la Galeria',
          fraternidades: fraternidades,
          buscar: buscar,
          paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, fraternidades.count),
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('galeriaAdm')
  async rendergaleriaAdm(@Res() res: Response,
      @Query('paginaActual') actual = 0,
      @Query('itemPaginas') items = 2,
      @Query('buscar') buscar = '') {
      const fraternidades = await  
      this.galeriaService.getAllPagination(items, actual, buscar);        
      return res.render('galeriaAdm/index', {
          title: 'Lista de la Galeria',
          fraternidades: fraternidades,
          buscar: buscar,
          paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, fraternidades.count),
      });
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        if (!file || !file.originalname) {
          return cb(new Error('Archivo no válido'), String(null));
        }
        
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}${ext}`;
        cb(null, name);
      }
    })
  }))
  async crearGaleria(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Res() res: Response
  ) {
    try {
      if (!file) {
        return res.status(400).json({ error: 'No se ha subido ningún archivo' });
      }

      const nuevaEntrada = await this.galeriaService.create({
        titulo: body.titulo,
        descripcion: body.descripcion,
        imagen: file.filename 
      });
      return res.redirect('/galeria/galeriaAdm');
    } catch (error) {
      console.error('Error al crear galería:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  @Post(':id')
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        if (!file || !file.originalname) {
          return cb(new Error('Archivo no válido'), String(null));
        }
        
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}${ext}`;
        cb(null, name);
      }
    })
  }))
  async actualizarGaleria(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Res() res: Response
  ) {
    try {
      const updateData: any = {
        titulo: body.titulo,
        descripcion: body.descripcion,
      };

      // Solo actualizar la imagen si se subió una nueva
      if (file) {
        updateData.imagen = file.filename;
      }

      const resultado = await this.galeriaService.update(+id, updateData);
      
      if (!resultado) {
        return res.status(404).json({ error: 'Entrada no encontrada' });
      }

      return res.redirect('/galeria/galeriaAdm');
    } catch (error) {
      console.error('Error al actualizar galería:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  @Get('eliminar/:id')
  async eliminarGaleria(@Param('id') id: string, @Res() res: Response) {
    try {
      const resultado = await this.galeriaService.remove(+id);
      
      if (!resultado) {
        return res.status(404).json({ error: 'Entrada no encontrada' });
      }

      return res.redirect('/galeria/galeriaAdm');
    } catch (error) {
      console.error('Error al eliminar galería:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

}