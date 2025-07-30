import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Render } from '@nestjs/common';
import { ClientesesionService } from './clientesesion.service';
import { CreateClientesesionDto } from './dto/create-clientesesion.dto';
import { UpdateClientesesionDto } from './dto/update-clientesesion.dto';
import { Response } from 'express';

@Controller('clientesesion')
export class ClientesesionController {
  constructor(private readonly clientesesionService: ClientesesionService) {}

  @Get('registerclient')
  @Render('registerclient')
  getRegister() {
    return { title: 'Registro' };
  }
  
  @Post('register')
  async register(@Body() createUserDto, @Res() res:Response) {
    try {
      let resultado = await this.clientesesionService.create(createUserDto);
      if(resultado)
        return res.redirect('/auth/loginclient');
    } catch (error) {
      return { success: false, message: 'Error al registrar usuario' };
    }
  }

}
