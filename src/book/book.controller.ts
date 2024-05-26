import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.bookService.findByName(name);
  }

  // If I were to build UI I would take id as a input and date as dto.
  //  As for finding the book in the front end I would write search api
  @Patch('name/:name/return')
  async returnBook(
    @Param('name') name: string,
    @Body() returnBookDto: ReturnBookDto,
  ) {
    return await this.bookService.returnBook(name, returnBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
