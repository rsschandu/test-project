import { Customer } from 'src/customer/entities/customer.entity';
import { LendingHistory } from 'src/lending_history/entities/lending_history.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BookType {
  Regular = 'Regular',
  Fiction = 'Fiction',
  Novel = 'Novel',
}

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  authorName: string;

  @Column()
  bookName: string;

  @Column({ default: 'Regular', type: 'enum', enum: BookType })
  bookType: BookType;

  @OneToOne(() => LendingHistory, (lendingHistory) => lendingHistory.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'currentLendingHistoryId' })
  currentLendingHistoryId: string;
}
