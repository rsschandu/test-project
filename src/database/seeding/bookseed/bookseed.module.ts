import { Module } from '@nestjs/common';
import { BookseedService } from './bookseed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Customer, LendingHistory])],
  providers: [BookseedService],
})
export class BookseedModule {}
