import { Test, TestingModule } from '@nestjs/testing';
import { ClientesesionService } from './clientesesion.service';

describe('ClientesesionService', () => {
  let service: ClientesesionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesesionService],
    }).compile();

    service = module.get<ClientesesionService>(ClientesesionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
