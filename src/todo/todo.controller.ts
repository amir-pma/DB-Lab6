import { Body, Controller, Get, Post, Delete, Put, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import CreateItemDto from './dto/create-item.dto';
import CreateTagDto from './dto/create-tag.dto';
import CreateTaskDto from './dto/create-task.dto';
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
    updateItem(@Request() req, @Query('itemId') itemId, @Body() item: CreateItemDto) {
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
    deleteItem(@Request() req, @Query('itemId') itemId) {
        return this.todoServices.deleteItem(req.user.id, itemId);
    }

    @ApiResponse({ status: 200, description: "Adds new task to database" }) 
    @ApiBearerAuth()
    @Post('tasks')
    insertTask( @Request() req, @Body() task: CreateTaskDto) {
        return this.todoServices.insertTask(req.user.id, task);
    }

    @ApiResponse({ status: 200, description: "Gets all the tasks in database" }) 
    @ApiBearerAuth()
    @Get('tasks')
    getAllTasks(@Request() req) {
        return this.todoServices.getAllTasks(req.user.id);
    }

    @ApiResponse({ status: 200, description: "Updates an existing task in database" })
    @ApiBearerAuth()
    @ApiQuery({
        name: 'taskId',
        required: true,
        type: Number,
        description :`id of task being updated`
    })
    @Put('tasks')
    updateTask(@Request() req, @Query('taskId') taskId, @Body() task: CreateTaskDto) {
        return this.todoServices.updateTask(req.user.id, taskId, task);
    }

    @ApiResponse({ status: 200, description: "Deletes an existing task in database" })
    @ApiBearerAuth()
    @ApiQuery({
        name: 'taskId',
        required: true,
        type: Number,
        description :`id of task being deleted`
    })
    @Delete('tasks')
    deleteTask(@Request() req, @Query('taskId') taskId) {
        return this.todoServices.deleteTask(req.user.id, taskId);
    }

}
