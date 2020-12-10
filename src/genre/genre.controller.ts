import { Body, Controller, Get, Post, Delete, Put, Query } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import UpdateGenreDto from './dto/update-genre.dto';

@Controller('genre')
export default class GenreController {
    constructor(private readonly genreServices: GenreService) {}

    @ApiResponse({ status: 200, description: "Adds new genre to database" }) 
    @ApiBearerAuth()
    @Post('post')
    postGenre( @Body() genre: CreateGenreDto) {
        return this.genreServices.insert(genre);
    }

    @ApiResponse({ status: 200, description: "Gets all the genres in database" }) 
    @ApiBearerAuth()
    @Get()
    getAll() {
        return this.genreServices.getAllGenre();
    }

    @ApiResponse({ status: 200, description: "Deletes a genre from database" })
    @ApiBearerAuth()
    @ApiQuery({
        name: 'genreID',
        required: true,
        type: Number,
        description :`id of genre being deleted`
    })
    @Delete('delete')
    deleteBook(@Query('genreID') genreID) {
        return this.genreServices.delete(genreID);
    }

    @ApiResponse({ status: 200, description: "Updates an existing genre in database" })
    @ApiBearerAuth()
    @Put('update')
    updateBook(@Body() genre: UpdateGenreDto) {
        return this.genreServices.update(genre);
    }
}