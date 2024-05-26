import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, LendingHistory])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
