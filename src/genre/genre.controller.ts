import { Body, Controller, Get, Post } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('genre')
export default class GenreController {
    constructor(private readonly genreServices: GenreService) {}

    @ApiResponse({ status: 200, description: "Adds new genre to database" }) 
    @Post('post')
    postGenre( @Body() genre: CreateGenreDto) {
        return this.genreServices.insert(genre);
    }

    @ApiResponse({ status: 200, description: "Gets all the genres in database" }) 
    @Get()
    getAll() {
        return this.genreServices.getAllGenre();
    }
}