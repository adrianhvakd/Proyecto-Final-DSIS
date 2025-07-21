import { Controller, Get, Post, Body, Render, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('register')
  @Render('register')
  getRegister() {
    return { title: 'Registro' };
  }

  @Post('register')
  async register(@Body() createUserDto, @Res() res:Response) {
    try {
      let resultado = await this.usersService.create(createUserDto);
      if(resultado)
        return res.redirect('/auth/login');
    } catch (error) {
      return { success: false, message: 'Error al registrar usuario' };
    }
  }
}