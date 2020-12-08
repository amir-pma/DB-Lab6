import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
    @ApiProperty({type: "string" ,description:"Enter user's name"})
    readonly name: string;

    @ApiProperty({type: "string" ,description:"Enter user's username"})
    readonly username: string;

    @ApiProperty({type: "string" ,description:"Enter user's password"})
    readonly password: string;

    @ApiProperty({type: "array", items: {type: "number"} ,description:"Enter ids of the books of the user."}) 
    readonly books: number[];
}
