import { Body, Controller, Get, Post, Delete, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import CreateTagDto from './dto/create-tag.dto';
import { TodoService } from './todo.service';


@Controller('todo')
export default class TodoController {
    constructor(private readonly todoServices: TodoService) {}

    @ApiResponse({ status: 200, description: "Adds new category to database" }) 
    @ApiBearerAuth()
    @Post('categories')
    insertCategory( @Body() category: CreateCategoryDto) {
        return this.todoServices.insertCategory(category);
    }

    @ApiResponse({ status: 200, description: "Gets all the categories in database" }) 
    @ApiBearerAuth()
    @Get('categories')
    getAllCategories() {
        return this.todoServices.getAllCategories();
    }

    @ApiResponse({ status: 200, description: "Adds new tag to database" }) 
    @ApiBearerAuth()
    @Post('tags')
    insertTag( @Body() tag: CreateTagDto) {
        return this.todoServices.insertTag(tag);
    }

    @ApiResponse({ status: 200, description: "Gets all the tags in database" }) 
    @ApiBearerAuth()
    @Get('tags')
    getAllTags() {
        return this.todoServices.getAllTags();
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