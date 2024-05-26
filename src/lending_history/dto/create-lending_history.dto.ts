import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

export class CreateLendingHistoryDto {
  id: string;
  lendDate: Date;
  daysToReturn: number;
  customerId: number;
  bookId: string;
  book: CreateBookDto;
  customer: CreateCustomerDto;
}
