import { ApiProperty } from '@nestjs/swagger';

export default class CreateGenreDto {
    @ApiProperty({type: "string" ,description:"Enter genre's name(type)"}) 
    readonly type: string;
}