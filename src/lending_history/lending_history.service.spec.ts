import { Test, TestingModule } from '@nestjs/testing';
import { LendingHistoryService } from './lending_history.service';

describe('LendingHistoryService', () => {
  let service: LendingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LendingHistoryService],
    }).compile();

    service = module.get<LendingHistoryService>(LendingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
