import { Book } from 'src/book/entities/book.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['lendDate', 'bookId', 'customerId'])
export class LendingHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lendDate: Date;

  @Column()
  daysToReturn: number;

  @Column()
  customerId: number;

  @OneToMany(() => Customer, (customer) => customer.id)
  customer: Customer;

  @Column()
  bookId: string;

  @OneToMany(() => Book, (book) => book.id)
  book: Book;

  @Column({ nullable: true })
  returnDate: Date;

  @Column({ nullable: true })
  rental_charge: number;
}
