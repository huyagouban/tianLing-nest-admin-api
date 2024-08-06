import { Test, TestingModule } from '@nestjs/testing';
import { DictDataController } from './dict-data.controller';
import { DictDataService } from './dict-data.service';

describe('DictDataController', () => {
  let controller: DictDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictDataController],
      providers: [DictDataService],
    }).compile();

    controller = module.get<DictDataController>(DictDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
