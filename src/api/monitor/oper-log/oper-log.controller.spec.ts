import { Test, TestingModule } from '@nestjs/testing';
import { OperLogController } from './oper-log.controller';
import { OperLogService } from './oper-log.service';

describe('OperLogController', () => {
  let controller: OperLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperLogController],
      providers: [OperLogService],
    }).compile();

    controller = module.get<OperLogController>(OperLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
