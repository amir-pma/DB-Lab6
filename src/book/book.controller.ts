import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksServices } from './book.service';
import CreateBookDto from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksServices: BooksServices) {}

    @Post('post')
    postBook( @Body() genre: CreateBookDto) {
        return this.booksServices.insert(genre);
    }

    @Get()
    getAll() {
        return this.booksServices.getAllBooks();
    }
}