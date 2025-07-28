import { Controller, Get, Post, Body, Render, UseGuards, Res, Query, Param, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserNuevoDto } from './dto/users.dto';
import { title } from 'process';
import { Paginate } from 'src/shared/paginate';

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

  @UseGuards(AuthGuard('jwt'))
    @Get('')
    async index(@Res() res:Response,
       @Query('paginaActual') actual=0,
        @Query('itemPaginas') items=2,
        @Query('buscar') buscar = ''){
            //actual--;
        const users = await  
        this.usersService.getAllPagination(items,actual,buscar);        
        return res.render('users/index',{
            title: 'Lista de Usuarios',
            users: users,
            buscar: buscar,
            paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, users.count),
        });
    }

    @Get('/formusers')
    form(@Res() res:Response){
      return res.render('users/form', {
        title: 'Crear un nuevo usuario',
      }); 
    }
    //crear -storage
    @Post('')
    async create(@Body() user:UserNuevoDto,@Res() res:Response){
        let respuesta = await this.usersService.create(user)
        if(respuesta)
            return res.redirect('/users')
        else
            return res.redirect('/users/formusers')
    }
    //crear -editar
    @Get('/formedit/:id')
    @Render('users/form')
    async formEdit(@Param('id') id: number, @Res() res: Response) {
        let item:UserNuevoDto | null = await this.usersService.findById(id);
        return {
          item:item,
          title: 'Editar Usuario',
        };
    }
    //crear -storage
    @Post('/edit/:id')
    async update(@Body() udpateUser:UserNuevoDto, @Param('id') id:number, @Res() res:Response){
        const final = {
          ...udpateUser,
          isActive: String(udpateUser.isActive) === 'true'
        };
        
        let respuesta = await this.usersService.edit(final,id);
        if(respuesta)
            return res.redirect('/users/')
        else{
            //mostrar el error
        }    
            
    }
    //delete
    @Get('/delete/:id')
    @Redirect('/users')
    async delete(@Param('id') id: number) {
        let result = await this.usersService.delete(id);
        
    }

}