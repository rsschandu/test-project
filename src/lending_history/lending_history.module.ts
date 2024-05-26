import { Module } from '@nestjs/common';
import { LendingHistoryService } from './lending_history.service';
import { LendingHistoryController } from './lending_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LendingHistory } from './entities/lending_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LendingHistory])],
  controllers: [LendingHistoryController],
  providers: [LendingHistoryService],
})
export class LendingHistoryModule {}
