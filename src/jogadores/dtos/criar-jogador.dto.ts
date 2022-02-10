import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator'

export class CriarJogadorDto {

    @IsNotEmpty()
    @IsNumberString()
    @Length(11, 11)
    @ApiProperty({
        example: 31989906767,
    })
    celular: string;

    @IsEmail()
    @ApiProperty({
        example: "laxcs@gmail.com",
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "João Silveira",
    })
    nome: string;
}