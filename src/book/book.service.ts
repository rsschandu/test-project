import { HttpException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book, BookType } from './entities/book.entity';
import { Repository } from 'typeorm';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';
import { ReturnBookDto } from './dto/return-book.dto';
import { PricingTable } from 'src/pricing_table/entities/pricing_table.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(LendingHistory)
    private lendingHistoryRepository: Repository<LendingHistory>,
    @InjectRepository(PricingTable)
    private pricingTableRepository: Repository<PricingTable>,
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

  async returnBook(name: string, returnBookDto: ReturnBookDto) {
    const book = await this.bookRepository.findOne({
      where: {
        bookName: name,
      },
    });
    let response = [];
    for (const id of returnBookDto.returnBookIds) {
      const price = await this.handleReturnSingleBook(
        id,
        new Date(returnBookDto.returnDate),
      );
      response.push(price);
    }
    return response;
  }

  async handleReturnSingleBook(id: string, returnDate: Date) {
    const book = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });
    if (book) {
      if (book.currentLendingHistoryId) {
        const currentLending = await this.lendingHistoryRepository.findOne({
          where: {
            id: book.currentLendingHistoryId,
          },
        });
        const days = Math.ceil(
          (returnDate.getTime() - currentLending.lendDate.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        // If book is returned update the lending history and book
        this.lendingHistoryRepository.update(currentLending.id, {
          returnDate: returnDate,
          rental_charge: days * (await this.getBookPrice(book.bookType, days)),
        });
        this.bookRepository.update(book.id, {
          currentLendingHistoryId: null,
        });
        return {
          name: book.bookName,
          rental_charge: days * (await this.getBookPrice(book.bookType, days)),
        };
      }
      throw new HttpException(
        `Error in returning. One of the book: ${book.bookName} is already available`,
        400,
      );
    }
    throw new HttpException(`Book with ${id} not found`, 400);
  }

  async getBookPrice(type: BookType, days: number): Promise<number> {
    const priceEntity = await this.pricingTableRepository.findOne({
      where: {
        bookType: type,
      },
    });
    if (!priceEntity) {
      throw new HttpException(`Price for ${type} not found`, 400);
    }
    if (days <= priceEntity.minimumDays) {
      return Math.max(priceEntity.minimumCharge, days * priceEntity.price);
    } else {
      return (
        (days - priceEntity.minimumDays) *
          (priceEntity.additionalCharge + priceEntity.price) +
        priceEntity.price * priceEntity.minimumDays
      );
    }
  }
}
