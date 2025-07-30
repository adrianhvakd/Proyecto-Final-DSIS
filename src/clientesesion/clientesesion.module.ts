import { Module } from '@nestjs/common';
import { ClientesesionService } from './clientesesion.service';
import { ClientesesionController } from './clientesesion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientesesion } from './entities/clientesesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clientesesion])],
  controllers: [ClientesesionController],
  providers: [ClientesesionService],
  exports: [ClientesesionService],
})
export class ClientesesionModule {}
