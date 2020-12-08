import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/entity/genre.entity';
import { getRepository } from 'typeorm';

@Injectable()
export default class GenreService {
    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {
        const repository = getRepository(GenreEntity);
        const genreEntity: GenreEntity = repository.create();
        const {type} = genreDetails;
        genreEntity.type = type;
        await repository.save(genreEntity);
        return genreEntity;
    }

    async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
    }
}