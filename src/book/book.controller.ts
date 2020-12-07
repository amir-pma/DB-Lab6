import { Body, Controller, Get, Post } from '@nestjs/common';
import BooksService from './book.service';
import CreateBookDto from './dto/create-book.dto';

@Controller('books')
export default class BooksController {
    constructor(private readonly booksServices: BooksService) {}

    @Post('post')
    postBook( @Body() genre: CreateBookDto) {
        return this.booksServices.insert(genre);
    }

    @Get()
    getAll() {
        return this.booksServices.getAllBooks();
    }
}