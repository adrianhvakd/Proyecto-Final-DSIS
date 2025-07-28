import { Controller, Get, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users/users.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UsersService) {}

  @Get('')
  @Render('index')
  index(){
      return {title:'Hola Mundo'};
  }

  @Get('login')
  @Render('login')
  renderlogin(){}

  @UseGuards(AuthGuard('jwt'))
  @Get('dashboard')
  @Render('dashboard')
  async getCurrentUser(@Request() req) {
    let user = await this.userService.findById(req.user.userId);
    return {
      title: 'Panel Principal',
      user: user,
      };
  }

  
}
