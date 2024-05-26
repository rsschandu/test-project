import { Injectable } from '@nestjs/common';
import { CreateLendingHistoryDto } from './dto/create-lending_history.dto';
import { UpdateLendingHistoryDto } from './dto/update-lending_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LendingHistory } from './entities/lending_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LendingHistoryService {
  constructor(
    @InjectRepository(LendingHistory)
    private lendingHistoryRepository: Repository<LendingHistory>,
  ) {}
  create(createLendingHistoryDto: CreateLendingHistoryDto) {
    return this.lendingHistoryRepository.save(createLendingHistoryDto);
  }

  findAll() {
    return this.lendingHistoryRepository.find();
  }

  findOne(id: string) {
    return this.lendingHistoryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateLendingHistoryDto: UpdateLendingHistoryDto) {
    return `This action updates a #${id} lendingHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} lendingHistory`;
  }
}
