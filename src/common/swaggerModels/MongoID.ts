import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class MongoID {
    @IsMongoId()
    @ApiProperty({example: "6203a140e0fcf2ca7f81e718"})
    _id: string
}