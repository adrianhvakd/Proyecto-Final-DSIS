// 6. AUTH CONTROLLER (src/auth/auth.controller.ts)
import { Controller, Post, Body, UseGuards, Request, Get, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Render('login')
  renderlogin(){}
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const loginResult = await this.authService.login(req.user);
    
    response.cookie('access_token', loginResult.access_token, {
        httpOnly: true,             // No accesible desde JS
        secure: process.env.NODE_ENV === 'production', // Sólo HTTPS en prod
        sameSite: 'strict',         // Evita envío cross-site
        maxAge: 24 * 60 * 60 * 1000, // 1 día en ms
    });

    // Rediriges a dashboard, el navegador enviará la cookie automáticamente
    return response.redirect('/dashboard');
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
    // Borra la cookie 'access_token'
        response.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

    // Puedes responder con un mensaje o redirigir
      return response.redirect('/auth/login');
    }

}