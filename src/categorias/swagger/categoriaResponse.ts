import { Evento } from '../interfaces/categoria.interface';
import { Jogador } from '../../jogadores/interfaces/jogador.interface';
import { MongoDBDocument } from '../../common/swaggerModels/MongoDBDocument';
import { ApiProperty } from "@nestjs/swagger"

export class CategoriaResponse extends MongoDBDocument {
    
    @ApiProperty({
        description: "Nome da categoria, não se repete.",
        example: "A",
    })
    categoria: string
    @ApiProperty({
        description: "Descrição da categoria.",
        example: "Categoria A - Melhores Players",
    })
    descricao: string
    @ApiProperty({
        description: "Array de eventos, onde cada item pode ter um valor a ser somado ou subtraido de acordo com o evento.",
        example: [
            {
                "nome": "VITORIA",
                "operacao": "+",
                "valor": 15,
                "_id": "6203a140e0fcf2ca7f81e719"
            },
            {
                "nome": "VITORIA_LIDER",
                "operacao": "+",
                "valor": 30,
                "_id": "6203a140e0fcf2ca7f81e71a"
            },
            {
                "nome": "DERROTA",
                "operacao": "-",
                "valor": 30,
                "_id": "6203a140e0fcf2ca7f81e71b"
            }
        ],
    })
    eventos: Array<Evento>
    @ApiProperty({example: [], description: "Jogadores associados a esta categoria."})
    jogadores: Array<Jogador>
    __v: number
}