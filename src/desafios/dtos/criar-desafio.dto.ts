import { IsDateString, IsMongoId, IsNotEmpty } from "class-validator";

export class CriarDesafioDto{
    @IsDateString()
    @IsNotEmpty()
    dataHoraDesafio: string

    @IsMongoId()
    solicitante: string

    @IsMongoId()
    jogadorDesafiado: string

}