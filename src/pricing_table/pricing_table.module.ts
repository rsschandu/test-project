import { Module } from '@nestjs/common';
import { PricingTableService } from './pricing_table.service';
import { PricingTableController } from './pricing_table.controller';

@Module({
  controllers: [PricingTableController],
  providers: [PricingTableService],
})
export class PricingTableModule {}
