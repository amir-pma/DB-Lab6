import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import TaskEntity from './task.entity';
import UserEntity from './user.entity';

@Entity()
export default class ItemEntity extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    description: string;

    @ManyToOne(type => TaskEntity, task => task.items)
    task: TaskEntity;

    @ManyToOne(type => UserEntity, user => user.items, { eager: true })
    user: UserEntity;

}
