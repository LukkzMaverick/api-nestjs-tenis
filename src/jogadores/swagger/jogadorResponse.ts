import { MongoDBDocument } from '../../swaggerModels/MongoDBDocument';
import { ApiProperty } from "@nestjs/swagger"

export class JogadorResponse extends MongoDBDocument{

    @ApiProperty({example: "31965693230"})
    celular: string
    @ApiProperty({example: "lss@mail.com"})
    email: string
    @ApiProperty({example: "Joãozinho"})
    nome: string
}
