import { CreateLendingHistoryDto } from 'src/lending_history/dto/create-lending_history.dto';

export class CreateBookDto {
  id?: string;
  authorName: string;
  bookName: string;
  currentLendingHistoryId?: string;
  currentLendingHistory?: CreateLendingHistoryDto;
}
