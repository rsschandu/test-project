import { Test, TestingModule } from '@nestjs/testing';
import { PricingTableController } from './pricing_table.controller';
import { PricingTableService } from './pricing_table.service';

describe('PricingTableController', () => {
  let controller: PricingTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricingTableController],
      providers: [PricingTableService],
    }).compile();

    controller = module.get<PricingTableController>(PricingTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
