import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import {getConnection} from "typeorm";
import UpdateUserDto from './dto/update-user.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {

	async insert(userDetails: CreateUserDto): Promise<UserEntity> {
		const userEntity: UserEntity = UserEntity.create();
		const { name, username, password } = userDetails;
		userEntity.name = name;
		userEntity.username = username;
		userEntity.password = await hash(password, 10);
		await UserEntity.save(userEntity);
		return userEntity;
	}

	async getAllUsers(): Promise<UserEntity[]> {
		return await UserEntity.find();
	}
	
	async getBooksOfUser(userID: number): Promise<BookEntity[]> {
		console.log(typeof(userID));
		const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
		return user.books;
	}

	async delete(userID: number): Promise<UserEntity> {
        const user = await UserEntity.findOne(userID);
        await user.remove();
		return user;
    }

    async update(userDetails: UpdateUserDto): Promise<UserEntity> {
		const { id, name, username, password } = userDetails;
        const user = await UserEntity.findOne(id);
        if(user != undefined) {
			user.name = name;
			user.username = username;
			user.password = hash(password, 10);
			await UserEntity.save(user);
        }
        return user;
	}
	
	async findByUserName(userName: string): Promise<UserEntity | undefined> {
        return await UserEntity.findOne({where: {username: userName}});
    }
}