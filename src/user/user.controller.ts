import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import UserService from './user.service';
import CreateUserDto from './dto/create-user.dto';
import {ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';


@Controller('users')
export default class UserController {
    constructor(private readonly usersServices: UserService) {}

    //'postUser()' will handle the creating of new User
    @ApiResponse({ status: 200, description: "Adds new user to database" }) 
    @Post('post')
    postUser( @Body() user: CreateUserDto) {
        return this.usersServices.insert(user);
    }

    // 'getAll()' returns the list of all the existing users in the database
    @ApiResponse({ status: 200, description: "Gets all the users in database" }) 
    @Get()
    getAll() {
        return this.usersServices.getAllUsers();
    }

    //'getBooks()' return all the books which are associated with the user 
    // provided through 'userID' by the request  
    @ApiResponse({ status: 200, description: "Gets Books of a specific user" }) 
    @Get('books')
    getBooks( @Body('userID', ParseIntPipe) userID: number ) {
        return this.usersServices.getBooksOfUser(userID);
    }
}