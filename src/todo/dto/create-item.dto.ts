import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNumber, IsString } from "class-validator";

export default class CreateItemDto {

    @IsString()
    @ApiProperty({
      type: String,
      description: 'Task item description',
      maxLength: 500
    })
    readonly description: string;

    @IsNumber()
    @ApiProperty({
      type: Number,
      description: 'Task the item belongs to'
    })
    readonly task: number;

  }
