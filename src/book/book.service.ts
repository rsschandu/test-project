import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(LendingHistory)
    private lendingHistoryRepository: Repository<LendingHistory>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: string) {
    return this.bookRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: string) {
    return this.bookRepository.delete(id);
  }

  async findByName(name: string) {
    const book = await this.bookRepository.findOne({
      where: {
        bookName: name,
      },
    });
    if (book) {
      if (book.currentLendingHistoryId) {
        const currentLending = await this.lendingHistoryRepository.findOne({
          where: {
            id: book.currentLendingHistoryId,
          },
        });
        const avaiableOn = new Date(
          currentLending.lendDate.getTime() +
            currentLending.daysToReturn * 24 * 60 * 60 * 1000,
        );
        const { currentLendingHistoryId, ...response } = {
          ...book,
          avaiableOn,
        };
        return response;
      }
      const { currentLendingHistoryId, ...response } = {
        ...book,
        status: 'Available',
      };
      return response;
    }
    return 'Book not found';
  }
}
