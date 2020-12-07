import { ApiProperty } from '@nestjs/swagger';

export default class CreateBookDto {
    @ApiProperty({type: "string" ,description:"Enter book's name"}) 
    readonly name: string;

    @ApiProperty({type: "number" ,description:"Enter the id of the owner of the book"}) 
    readonly userID: number;

    @ApiProperty({type: "array", items: {type: "number"} ,description:"Enter ids of the genres of the book."}) 
    readonly genreIDs: number[];
}
  