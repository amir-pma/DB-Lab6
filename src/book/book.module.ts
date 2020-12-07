import { Module } from '@nestjs/common';
import { BooksServices } from './book.service';
import { BooksController } from './book.controller';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksServices],
})
export default class BooksModule {}