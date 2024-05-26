import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { BookseedModule } from './bookseed/bookseed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BookseedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    // TypeOrmModule.forFeature([BookseedModule]),
  ],
})
export class SeedingModule {}
