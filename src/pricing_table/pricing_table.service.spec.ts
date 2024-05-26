import { Test, TestingModule } from '@nestjs/testing';
import { PricingTableService } from './pricing_table.service';

describe('PricingTableService', () => {
  let service: PricingTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricingTableService],
    }).compile();

    service = module.get<PricingTableService>(PricingTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
