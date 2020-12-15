import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import UserEntity from './user.entity';
import { Optional } from '@nestjs/common';
import CategoryEntity from './category.entity';
import TagEntity from './tag.entity';
import ItemEntity from './item.entity';

@Entity()
export default class TaskEntity extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Optional()
    @Column({ length: 500 })
    description: string;

    @ManyToOne(type => CategoryEntity, category => category.tasks, { eager: true })
    category: CategoryEntity;

    @Optional()
    @ManyToMany(type => TagEntity, { eager: true })
    @JoinTable()
    tags: TagEntity[];

    @ManyToOne(type => UserEntity, user => user.tasks, { eager: true })
    user: UserEntity;

    @OneToMany(type => ItemEntity, item => item.task, { eager: true })
    items: ItemEntity[];

}
