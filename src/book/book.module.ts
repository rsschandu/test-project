import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';
import { PricingTable } from 'src/pricing_table/entities/pricing_table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, LendingHistory, PricingTable])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
