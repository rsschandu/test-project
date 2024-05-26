import { BookType } from 'src/book/entities/book.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PricingTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  price: number;

  @Column()
  bookType: BookType;
}
