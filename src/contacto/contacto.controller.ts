import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { Response } from 'express';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

    @Get('')
    @Render('contacto.hbs')
    rendercontacto(){}

    @Post('')
    async enviar(@Body() cont, @Res() res:Response){
      const result = await this.contactoService.create(cont);
      return result? res.redirect('/') : result;

    }
}
