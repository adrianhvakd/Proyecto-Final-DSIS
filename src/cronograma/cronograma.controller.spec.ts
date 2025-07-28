import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaController } from './cronograma.controller';
import { CronogramaService } from './cronograma.service';

describe('CronogramaController', () => {
  let controller: CronogramaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronogramaController],
      providers: [CronogramaService],
    }).compile();

    controller = module.get<CronogramaController>(CronogramaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
