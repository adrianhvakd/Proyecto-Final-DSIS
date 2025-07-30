import { Test, TestingModule } from '@nestjs/testing';
import { ClientesesionController } from './clientesesion.controller';
import { ClientesesionService } from './clientesesion.service';

describe('ClientesesionController', () => {
  let controller: ClientesesionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesesionController],
      providers: [ClientesesionService],
    }).compile();

    controller = module.get<ClientesesionController>(ClientesesionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
