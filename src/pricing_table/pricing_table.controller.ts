import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PricingTableService } from './pricing_table.service';
import { CreatePricingTableDto } from './dto/create-pricing_table.dto';
import { UpdatePricingTableDto } from './dto/update-pricing_table.dto';

@Controller('pricing-table')
export class PricingTableController {
  constructor(private readonly pricingTableService: PricingTableService) {}

  @Post()
  create(@Body() createPricingTableDto: CreatePricingTableDto) {
    return this.pricingTableService.create(createPricingTableDto);
  }

  @Get()
  findAll() {
    return this.pricingTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricingTableDto: UpdatePricingTableDto) {
    return this.pricingTableService.update(+id, updatePricingTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingTableService.remove(+id);
  }
}
