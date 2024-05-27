import { Book } from 'src/book/entities/book.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id' })
  customerId: number;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
  bookId: string;

  @Column({ nullable: true })
  returnDate: Date;

  @Column({ nullable: true })
  rental_charge: number;
}
