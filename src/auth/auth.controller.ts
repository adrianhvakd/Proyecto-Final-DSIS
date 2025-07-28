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
      let loginResult = await this.authService.login(req.user);
    
      response.cookie('access_token', loginResult.access_token, {
          httpOnly: true,           
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',       
      });

      return response.redirect('/dashboard');
    }

    @Get('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

      return response.redirect('/auth/login');
    }

}