import { ApiProperty } from '@nestjs/swagger';

export default class UpdateGenreDto {
    @ApiProperty({type: "number" ,description:"Enter genre's id"}) 
    readonly id: number;

    @ApiProperty({type: "string" ,description:"Enter genre's name(type)"}) 
    readonly type: string;
}