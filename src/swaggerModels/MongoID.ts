import { ApiProperty } from "@nestjs/swagger";

export class MongoID {
    @ApiProperty({example: "6203a140e0fcf2ca7f81e718"})
    _id: string
}