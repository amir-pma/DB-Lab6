import { Body, Controller, Get, Post, Delete, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TodoService } from './todo.service';


@Controller('books')
export default class TodoController {
    constructor(private readonly todoServices: TodoService) {}

    @ApiResponse({ status: 200, description: "Adds new category to database" }) 
    @ApiBearerAuth()
    @Post('post')
    insertCategory( @Body() category: CreateCategoryDto) {
        return this.todoServices.insertCategory(category);
    }

    @ApiResponse({ status: 200, description: "Gets all the books in database" }) 
    @ApiBearerAuth()
    @Get()
    getAll() {
        return this.booksServices.getAllBooks();
    }

    @ApiResponse({ status: 200, description: "Deletes a book from database" })
    @ApiBearerAuth()
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
    @ApiBearerAuth()
    @Put('update')
    updateBook(@Body() book: UpdateBookDto) {
        return this.booksServices.update(book);
    }
}