import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { EventoDto as Evento } from './evento.dto';
import { Type } from 'class-transformer';

export class CriarCategoriaDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Nome da categoria, não se repete.",
        example: "A",
    })
    categoria: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Descrição da categoria.",
        example: "Categoria A - Melhores Players",
    })
    descricao: string

    @IsArray()
    @ArrayMinSize(1)
    @ApiProperty({
        type: 'array',
        items: {
             $ref: getSchemaPath(Evento) 
        },
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
        ]
    })
    @ValidateNested()
    @Type(() => Evento)
    eventos!: Array<Evento>

}