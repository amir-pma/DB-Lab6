import { Body, Controller, Get, Post } from '@nestjs/common';
import BooksService from './book.service';
import CreateBookDto from './dto/create-book.dto';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';


@Controller('books')
export default class BooksController {
    constructor(private readonly booksServices: BooksService) {}

    @ApiResponse({ status: 200, description: "Adds new book to database" }) 
    @Post('post')
    postBook( @Body() book: CreateBookDto) {
        return this.booksServices.insert(book);
    }

    @ApiResponse({ status: 200, description: "Gets all the books in database" }) 
    @Get()
    getAll() {
        return this.booksServices.getAllBooks();
    }
}