import { IsDateString, IsMongoId, IsNotEmpty } from "class-validator";

export class CriarDesafioDto{
    @IsDateString()
    dataHoraDesafio: string

    @IsMongoId()
    solicitante: string

    @IsMongoId()
    jogadorDesafiado: string

}