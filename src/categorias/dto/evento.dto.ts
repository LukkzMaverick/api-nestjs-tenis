import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

enum Operacao {
    "+" = "+",
    "-" = "-",
}
export class EventoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "Nome do Evento",example: "VITORIA"})
    nome: string
    @IsEnum({"-": "-", "+": "+"})
    @ApiProperty({description: "Operação a ser efetuada", example: "+", enum: Operacao})
    operacao: string
    @IsNumber()
    @ApiProperty({description: "Valor da operação a ser efetuada", example: 30}) 
    valor: number
}


