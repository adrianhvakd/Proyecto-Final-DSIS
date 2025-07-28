import { Module } from '@nestjs/common';
import { PuestosService } from './puestos.service';
import { PuestosController } from './puestos.controller';
import { Puesto } from './entities/puesto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Puesto])
  ],
  controllers: [PuestosController],
  providers: [PuestosService],
})
export class PuestosModule {}
