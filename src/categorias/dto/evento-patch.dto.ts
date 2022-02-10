import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

const operacao = {
    "+": "+",
    "-": "-"
}

export class EventoPatchDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "Nome do Evento",example: "VITORIA"})
    @IsOptional()
    nome: string
    @IsEnum({entity: operacao})
    @IsOptional()
    @ApiProperty({description: "Operação a ser efetuada", example: "+", enum: ["+","-"]})
    operacao: string
    @IsNumber()
    @IsOptional()
    @ApiProperty({description: "Valor da operação a ser efetuada", example: 30}) 
    valor: number
}


