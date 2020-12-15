import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsArray, isNumber, IsNumber, IsOptional, IsString, Length } from "class-validator";

export default class CreateTaskDto {

    @IsString()
    @ApiProperty({
      type: String,
      description: 'Name of the task',
      maxLength: 500 
    })
    readonly name: string;

    @IsString()
    @Optional()
    @ApiPropertyOptional({
      type: String,
      description: 'Description of the task',
      maxLength: 500
    })
    readonly description: string;

    @IsNumber()
    @ApiProperty({
      type: Number,
      description: 'User the task belongs to'
    })
    readonly userID: number;

    @IsArray()
    @Optional()
    @ApiPropertyOptional({
      type: Array(String),
      description: 'Array of task items'
    })
    readonly items: string[];


    @IsNumber()
    @ApiProperty({
      type: Number,
      description: 'Category task belongs to'
    })
    readonly category: number;

    @IsOptional()
    @IsArray()
    @Optional()
    @ApiPropertyOptional({
      type: Array(Number),
      description: 'Array of task tags',
    })
    readonly tags: number[];
  }
