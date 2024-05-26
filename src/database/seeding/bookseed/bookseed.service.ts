import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Book } from 'src/book/entities/book.entity';
import { In, Repository } from 'typeorm';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';

interface ICustomerData {
  customer_id: string;
  customer_name: string;
  books: string;
}

interface IBookData {
  book_id: string;
  author_name: string;
  book_name: string;
  lend_date: string;
  days_to_return: number;
}

@Injectable()
export class BookseedService {
  private readonly logger = new Logger('BookSeeder');

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(LendingHistory)
    private lendingHistoryRepository: Repository<LendingHistory>,
  ) {}

  async run() {
    this.logger.log('Seeding Books...');
    const filePath = join(process.cwd(), 'uploads', 'customer_data.csv');
    const fileStream = fs.createReadStream(filePath);
    const data = await Papa.parse(fileStream, {
      header: true,
      complete: (results) => {
        this.seedCustomerAndBookData(results.data as ICustomerData[]);
      },
    });
    this.logger.log('Seeding Books Completed');
  }

  seedCustomerAndBookData = (parsedData: ICustomerData[]) => {
    parsedData.forEach(async (data) => {
      const customer = new Customer();
      customer.id = parseInt(data.customer_id);
      customer.name = data.customer_name;
      await this.customerRepository.upsert(customer, ['id']);

      const books = JSON.parse(data.books) as IBookData[];
      books.forEach(async (book) => {
        const bookEntity = new Book();
        bookEntity.id = book.book_id;
        bookEntity.authorName = book.author_name;
        bookEntity.bookName = book.book_name;
        await this.bookRepository.upsert(bookEntity, ['id']);

        const lendingHistory = new LendingHistory();
        lendingHistory.bookId = book.book_id;
        lendingHistory.customerId = parseInt(data.customer_id);
        lendingHistory.lendDate = new Date(book.lend_date);
        lendingHistory.daysToReturn = book.days_to_return;
        const lendingHisotrySaveObject =
          this.lendingHistoryRepository.create(lendingHistory);
        await this.lendingHistoryRepository.upsert(lendingHisotrySaveObject, [
          'id',
        ]);
      });
    });
  };
}
