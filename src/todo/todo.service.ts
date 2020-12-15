import BookEntity from '../db/entity/book.entity';
import UserEntity from '../db/entity/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/entity/genre.entity';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import CategoryEntity from 'src/db/entity/category.entity';
import CreateTagDto from './dto/create-tag.dto';
import TagEntity from 'src/db/entity/tag.entity';
import ItemEntity from 'src/db/entity/item.entity';
import CreateItemDto from './dto/create-item.dto';
import TaskEntity from 'src/db/entity/task.entity';
import CreateTaskDto from './dto/create-task.dto';

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

    async insertItem(loggedInUserId: number, newItem: CreateItemDto): Promise<ItemEntity> {
        const {description, task} = newItem;
        const itemEntity: ItemEntity = ItemEntity.create();
        itemEntity.description = description;
        itemEntity.task = await TaskEntity.findOne(task);
        itemEntity.user = await UserEntity.findOne(loggedInUserId);
        await ItemEntity.save(itemEntity);
        return itemEntity;
    }

    async getAllItems(loggedInUserId: number): Promise<ItemEntity[]> {
        const allItems = await ItemEntity.find();
        var userItems = [];
        for ( let i = 0; i < allItems.length ; i++)
        {
            if(allItems[i].user.id === loggedInUserId) {
                userItems.push(allItems[i]);
            }
        }
        return userItems;
    }

    async updateItem(loggedInUserId: number, itemId:number, newItem: CreateItemDto): Promise<ItemEntity> {
        const {description, task} = newItem;
        const itemEntity: ItemEntity = await ItemEntity.findOne(itemId);
        itemEntity.description = description;
        itemEntity.task = await TaskEntity.findOne(task);
        itemEntity.user = await UserEntity.findOne(loggedInUserId);
        await ItemEntity.save(itemEntity);
        return itemEntity;
    }

    async deleteItem(loggedInUserId: number, itemId:number): Promise<ItemEntity> {
        const item = await ItemEntity.findOne(itemId);
        if(item.user.id === loggedInUserId) {
            await item.remove();
        }
		return item;
    }

    async insertTask(loggedInUserId: number, newTask: CreateTaskDto): Promise<TaskEntity> {
        const {name, description, category, tags} = newTask;
        const task = TaskEntity.create();
        task.name = name;
        task.description = description || '';
        task.user = await UserEntity.findOne(loggedInUserId);
        task.category = await CategoryEntity.findOne(category);
        task.tags = [];
        for ( let i = 0; i < tags.length ; i++)
        {
            const tag = await TagEntity.findOne(tags[i]);
            task.tags.push(tag);
        }
        await task.save();
        return task;

    }

    async getAllTasks(loggedInUserId: number): Promise<TaskEntity[]> {
        const allTasks = await TaskEntity.find();
        var userTasks = [];
        for ( let i = 0; i < allTasks.length ; i++)
        {
            if(allTasks[i].user.id === loggedInUserId) {
                userTasks.push(allTasks[i]);
            }
        }
        return userTasks;
    }

    async updateTask(loggedInUserId: number, taskId:number, newTask: CreateTaskDto): Promise<TaskEntity> {
        const {name, description, category, tags} = newTask;
        const task = await TaskEntity.findOne(taskId);
        task.name = name;
        task.description = description || '';
        task.user = await UserEntity.findOne(loggedInUserId);
        task.category = await CategoryEntity.findOne(category);
        task.tags = [];
        for ( let i = 0; i < tags.length ; i++)
        {
            const tag = await TagEntity.findOne(tags[i]);
            task.tags.push(tag);
        }
        await task.save();
        return task;
    }

    async deleteTask(loggedInUserId: number, taskId:number): Promise<TaskEntity> {
        const task = await TaskEntity.findOne(taskId);
        if(task.user.id === loggedInUserId) {
            await task.remove();
        }
		return task;
    }

}