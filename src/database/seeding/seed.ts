import { NestFactory } from '@nestjs/core';
import { SeedingModule } from './seeding.module';
import { Logger } from '@nestjs/common';
import { BookseedService } from './bookseed/bookseed.service';

async function bootstrap() {
  const logger = new Logger('Seeder');
  const app = await NestFactory.createApplicationContext(SeedingModule);
  logger.log('Seeding initial data...');
  await app.get(BookseedService).run();
}

bootstrap();
