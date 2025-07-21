import { Controller, Get, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { use } from 'passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  index(){
      return {title:'Hola Mundo'};
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('dashboard')
  @Render('dashboard')
  getCurrentUser(@Request() req) {
    return {
      title: 'Panel Principal',
      user: req.user,
      };
  }
}
