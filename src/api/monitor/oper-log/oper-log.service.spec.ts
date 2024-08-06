import { Test, TestingModule } from '@nestjs/testing';
import { OperLogService } from './oper-log.service';

describe('OperLogService', () => {
  let service: OperLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperLogService],
    }).compile();

    service = module.get<OperLogService>(OperLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
