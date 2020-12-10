import { Body, Controller, Get, Post, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import {ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import UpdateUserDto from './dto/update-user.dto';
import { Public } from 'src/public.decorator';


@Controller('users')
export default class UserController {
    constructor(private readonly usersServices: UserService) {}

    //'postUser()' will handle the creating of new User
    @ApiResponse({ status: 200, description: "Adds new user to database" }) 
    @Public()
    @ApiBearerAuth()
    @Post('post')
    postUser( @Body() user: CreateUserDto) {
        return this.usersServices.insert(user);
    }

    // 'getAll()' returns the list of all the existing users in the database
    @ApiResponse({ status: 200, description: "Gets all the users in database" }) 
    @ApiBearerAuth()
    @Get()
    getAll() {
        return this.usersServices.getAllUsers();
    }

    //'getBooks()' return all the books which are associated with the user 
    // provided through 'userID' by the request  
    @ApiResponse({ status: 200, description: "Gets Books of a specific user" }) 
    @ApiBearerAuth()
    @Get('books')
    getBooks( @Body('userID', ParseIntPipe) userID: number ) {
        return this.usersServices.getBooksOfUser(userID);
    }

    @ApiResponse({ status: 200, description: "Deletes a user from database" })
    @ApiBearerAuth()
    @ApiQuery({
        name: 'userID',
        required: true,
        type: Number,
        description :`id of user being deleted`
    })
    @Delete('delete')
    deleteBook(@Query('userID') userID) {
        return this.usersServices.delete(userID);
    }

    @ApiResponse({ status: 200, description: "Updates an existing user in database" })
    @ApiBearerAuth()
    @Put('update')
    updateBook(@Body() user: UpdateUserDto) {
        return this.usersServices.update(user);
    }
}