import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/entity/genre.entity';
import { getRepository } from 'typeorm';
import UpdateGenreDto from './dto/update-genre.dto';

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

    async delete(genreID: number): Promise<GenreEntity> {
        const genre = await GenreEntity.findOne(genreID);
        await genre.remove();
		return genre;
    }

    async update(genreDetails: UpdateGenreDto): Promise<GenreEntity> {
        const { id, type } = genreDetails;
        const genre = await GenreEntity.findOne(id);
        if(genre != undefined) {
            genre.type = type;
            await GenreEntity.save(genre);
        }
        return genre;
    }
}