import { Injectable } from '@nestjs/common';
import { CreatePricingTableDto } from './dto/create-pricing_table.dto';
import { UpdatePricingTableDto } from './dto/update-pricing_table.dto';

@Injectable()
export class PricingTableService {
  create(createPricingTableDto: CreatePricingTableDto) {
    return 'This action adds a new pricingTable';
  }

  findAll() {
    return `This action returns all pricingTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pricingTable`;
  }

  update(id: number, updatePricingTableDto: UpdatePricingTableDto) {
    return `This action updates a #${id} pricingTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} pricingTable`;
  }
}
