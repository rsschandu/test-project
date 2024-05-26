import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LendingHistoryService } from './lending_history.service';
import { CreateLendingHistoryDto } from './dto/create-lending_history.dto';
import { UpdateLendingHistoryDto } from './dto/update-lending_history.dto';

@Controller('lending-history')
export class LendingHistoryController {
  constructor(private readonly lendingHistoryService: LendingHistoryService) {}

  @Post()
  create(@Body() createLendingHistoryDto: CreateLendingHistoryDto) {
    return this.lendingHistoryService.create(createLendingHistoryDto);
  }

  @Get()
  findAll() {
    return this.lendingHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lendingHistoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLendingHistoryDto: UpdateLendingHistoryDto,
  ) {
    return this.lendingHistoryService.update(+id, updateLendingHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lendingHistoryService.remove(+id);
  }
}
