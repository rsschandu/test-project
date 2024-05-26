import { PartialType } from '@nestjs/mapped-types';
import { CreatePricingTableDto } from './create-pricing_table.dto';

export class UpdatePricingTableDto extends PartialType(CreatePricingTableDto) {}
