import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cronograma } from './entities/cronograma.entity';
import { CronogramaService } from './cronograma.service';
import { CronogramaController } from './cronograma.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cronograma])],
  controllers: [CronogramaController],
  providers: [CronogramaService],
})
export class CronogramaModule {}
