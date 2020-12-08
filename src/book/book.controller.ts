import { Body, Controller, Get, Post, Delete, Put, Query } from '@nestjs/common';
import BooksService from './book.service';
import CreateBookDto from './dto/create-book.dto';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import UpdateBookDto from './dto/update-book.dto';


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

    @ApiResponse({ status: 200, description: "Deletes a book from database" })
    @ApiQuery({
        name: 'bookID',
        required: true,
        type: Number,
        description :`id of book being deleted`
    })
    @Delete('delete')
    deleteBook(@Query('bookID') bookID) {
        return this.booksServices.delete(bookID);
    }

    @ApiResponse({ status: 200, description: "Updates an existing book in database" })
    @Put('update')
    updateBook(@Body() book: UpdateBookDto) {
        return this.booksServices.update(book);
    }
}