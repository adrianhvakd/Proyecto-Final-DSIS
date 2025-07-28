import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { PuestosModule } from './puestos/puestos.module';
import { Puesto } from './puestos/entities/puesto.entity';
import { CronogramaModule } from './cronograma/cronograma.module';
import { Cronograma } from './cronograma/entities/cronograma.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'aea2',
    entities: [User,Cliente,Puesto,Cronograma],
    synchronize: true,
  }), UsersModule, AuthModule, ClienteModule, PuestosModule, CronogramaModule,CronogramaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
