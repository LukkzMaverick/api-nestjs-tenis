import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Evento } from '../interfaces/categoria.interface';

export class AtualizarCategoriaDto{

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "Descrição da categoria.",
        example: "Categoria A - Melhores Players",
    })
    descricao: string

    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    @ApiProperty({
        description: "Array de eventos, onde cada item pode ter um valor a ser somado ou subtraido de acordo com o evento.",
        example: [
            {
                "nome": "VITORIA",
                "operacao": "+",
                "valor": 30
            },
            {
                "nome": "VITORIA_LIDER",
                "operacao": "+",
                "valor": 50
            },
            {
                "nome": "DERROTA",
                "operacao": "-",
                "valor": 30
            }
        ],
    })
    eventos: Array<Evento>

}