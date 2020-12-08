import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
    @ApiProperty({type: "number" ,description:"Enter user's id"})
    readonly id: number;

    @ApiProperty({type: "string" ,description:"Enter user's name"})
    readonly name: string;

    @ApiProperty({type: "string" ,description:"Enter user's username"})
    readonly username: string;

    @ApiProperty({type: "string" ,description:"Enter user's password"})
    readonly password: string;

    @ApiProperty({type: "array", items: {type: "number"} ,description:"Enter ids of the books of the user."}) 
    readonly books: number[];
}
