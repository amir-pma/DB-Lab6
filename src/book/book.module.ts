import { Module } from '@nestjs/common';
import BooksService from './book.service';
import BooksController from './book.controller';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksService],
})
export default class BookModule {}