import { Test, TestingModule } from '@nestjs/testing';
import { DictDataService } from './dict-data.service';

describe('DictDataService', () => {
  let service: DictDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictDataService],
    }).compile();

    service = module.get<DictDataService>(DictDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
