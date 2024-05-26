import { Customer } from 'src/customer/entities/customer.entity';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  authorName: string;

  @Column()
  bookName: string;

  @Column({ nullable: true })
  currentLendingHistoryId: string;

  @OneToOne(() => LendingHistory, (lendingHistory) => lendingHistory.id, {
    nullable: true,
  })
  currentLendingHistory: LendingHistory;
}