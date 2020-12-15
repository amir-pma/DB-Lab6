import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsString } from "class-validator";

export default class CreateTagDto {

    @IsString()
    @ApiProperty({
      type: String,
      description: 'Name of the tag',
      maxLength: 500
    })
    readonly type: string;
  }
  
