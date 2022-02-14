import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AtualizarDescricaoCategoria {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Descrição da categoria.",
        example: "Categoria A - Melhores Players",
    })
    descricao: string
}