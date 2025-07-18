import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './persona/entities/persona.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'aea',
    entities: [Persona],
    synchronize: true,
  }),PersonaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
