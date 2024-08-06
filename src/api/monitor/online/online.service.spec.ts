import { Test, TestingModule } from '@nestjs/testing';
import { OnlineService } from './online.service';

describe('OnlineService', () => {
  let service: OnlineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnlineService],
    }).compile();

    service = module.get<OnlineService>(OnlineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
