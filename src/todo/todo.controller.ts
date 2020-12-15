import { Body, Controller, Get, Post, Delete, Put, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import CreateItemDto from './dto/create-item.dto';
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

    @ApiResponse({ status: 200, description: "Adds new item to database" }) 
    @ApiBearerAuth()
    @Post('items')
    insertItem( @Request() req, @Body() item: CreateItemDto) {
        return this.todoServices.insertItem(req.user.id, item);
    }

    @ApiResponse({ status: 200, description: "Gets all the item in database" }) 
    @ApiBearerAuth()
    @Get('items')
    getAllItems(@Request() req) {
        return this.todoServices.getAllItems(req.user.id);
    }

    @ApiResponse({ status: 200, description: "Updates an existing item in database" })
    @ApiBearerAuth()
    @ApiQuery({
        name: 'itemId',
        required: true,
        type: Number,
        description :`id of item being updated`
    })
    @Put('items')
    updateItem(@Request() req, @Query('bookID') itemId, @Body() item: CreateItemDto) {
        return this.todoServices.updateItem(req.user.id, itemId, item);
    }

    @ApiResponse({ status: 200, description: "Deletes an existing item in database" })
    @ApiBearerAuth()
    @ApiQuery({
        name: 'itemId',
        required: true,
        type: Number,
        description :`id of item being deleted`
    })
    @Delete('items')
    deleteItem(@Request() req, @Query('bookID') itemId) {
        return this.todoServices.deleteItem(req.user.id, itemId);
    }

}