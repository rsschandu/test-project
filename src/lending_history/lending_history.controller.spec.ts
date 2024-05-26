import { Test, TestingModule } from '@nestjs/testing';
import { LendingHistoryController } from './lending_history.controller';
import { LendingHistoryService } from './lending_history.service';

describe('LendingHistoryController', () => {
  let controller: LendingHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LendingHistoryController],
      providers: [LendingHistoryService],
    }).compile();

    controller = module.get<LendingHistoryController>(LendingHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
