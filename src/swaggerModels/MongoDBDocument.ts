import { ApiProperty } from "@nestjs/swagger"

export class MongoDBDocument {
    @ApiProperty({example: "6203a140e0fcf2ca7f81e718"})
    _id: string
    @ApiProperty({example: "2022-02-08T20:21:19.365Z", description: "dateTime de criação do objeto"})
    createdAt: string
    @ApiProperty({example: "2022-02-08T20:21:19.365Z", description: "dateTime de atualização do objeto"})
    updatedAt: string
    @ApiProperty({example: "0"})
    __v: number
}