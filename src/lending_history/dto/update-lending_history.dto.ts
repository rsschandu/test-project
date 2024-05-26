import { PartialType } from '@nestjs/mapped-types';
import { CreateLendingHistoryDto } from './create-lending_history.dto';

export class UpdateLendingHistoryDto extends PartialType(CreateLendingHistoryDto) {}
