import BookEntity from '../db/entity/book.entity';
import UserEntity from '../db/entity/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/entity/genre.entity';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import CategoryEntity from 'src/db/entity/category.entity';
import CreateTagDto from './dto/create-tag.dto';
import TagEntity from 'src/db/entity/tag.entity';

@Injectable()
export class TodoService {

    async insertCategory(newCategory: CreateCategoryDto): Promise<CategoryEntity> {
        const {name} = newCategory;
        const categoryEntity: CategoryEntity = CategoryEntity.create();
        categoryEntity.name = name;
        categoryEntity.tasks = [];
        await CategoryEntity.save(categoryEntity);
        return categoryEntity;
    }

    async getAllCategories(): Promise<CategoryEntity[]> {
        return CategoryEntity.find();
    }

    async insertTag(newTag: CreateTagDto): Promise<TagEntity> {
        const {name} = newTag;
        const tagEntity: TagEntity = TagEntity.create();
        tagEntity.name = name;
        await TagEntity.save(tagEntity);
        return tagEntity;
    }

    async getAllTags(): Promise<TagEntity[]> {
        return TagEntity.find();
    }








    async delete(bookID: number): Promise<BookEntity> {
        const book = await BookEntity.findOne(bookID);
        await book.remove();
		return book;
    }

    async update(bookDetails: UpdateBookDto): Promise<BookEntity> {
        const { id, name , userID , genreIDs } = bookDetails;
        const book = await BookEntity.findOne(id);
        if(book != undefined) {
            book.name = name;
            book.user = await UserEntity.findOne(userID) ;
            book.genres=[];
            for ( let i = 0; i < genreIDs.length ; i++)
            {
                const genre = await GenreEntity.findOne(genreIDs[i]);
                book.genres.push(genre);
            }
            await book.save();
        }
        return book;
    }
}