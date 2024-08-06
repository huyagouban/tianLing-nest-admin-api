import { Test, TestingModule } from '@nestjs/testing';
import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';

describe('OnlineController', () => {
  let controller: OnlineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnlineController],
      providers: [OnlineService],
    }).compile();

    controller = module.get<OnlineController>(OnlineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
