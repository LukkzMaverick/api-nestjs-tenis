import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from 'class-validator'

export class AtualizarJogadorDto {

    @IsNotEmpty()
    @IsNumberString()
    @Length(11, 11)
    @IsOptional()
    @ApiProperty({
        example: 31989906767,
    })
    celular: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({
        example: "laxcs@gmail.com",
        required: false
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "João Silveira",
    })
    nome: string;
}