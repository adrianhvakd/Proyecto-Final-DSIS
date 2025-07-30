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
import { GaleriaModule } from './galeria/galeria.module';
import { VentasModule } from './ventas/ventas.module';
import { Galeria } from './galeria/entities/galeria.entity';
import { ContactoModule } from './contacto/contacto.module';
import { Contacto } from './contacto/entities/contacto.entity';
import { ClientesesionModule } from './clientesesion/clientesesion.module';
import { Clientesesion } from './clientesesion/entities/clientesesion.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'aea3',
    entities: [User,Cliente,Puesto,Cronograma,Galeria,Contacto,Clientesesion],
    synchronize: true,
  }), UsersModule, AuthModule, ClienteModule, PuestosModule, CronogramaModule,CronogramaModule, GaleriaModule, VentasModule, ContactoModule, ClientesesionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
