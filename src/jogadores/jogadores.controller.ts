import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { MongoIdValidationPipe } from '../common/pipes/mongoIdValidation.pipe';
import { JogadorResponse } from './swagger/jogadorResponse';
import { messagesJogadores } from './messages/messagesJogadores';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    @ApiOperation({summary: "Cria um novo jogador"})
    @ApiResponse({status: 201, description: "Novo jogador criado com sucesso."})
    @ApiResponse({status: 400, description: messagesJogadores.EMAIL_CADASTRADO})
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    @Put(':_id')
    @ApiOperation({summary: "Atualiza um jogador pelo _id"})
    @ApiResponse({status: 204, description: "No Content."})
    @ApiResponse({status: 400, description: messagesJogadores.EMAIL_CADASTRADO})
    @ApiResponse({status: 404, description: messagesJogadores.JOGADOR_404})
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.NO_CONTENT)
    async atualizarJogador(@Param('_id', MongoIdValidationPipe) _id, @Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.atualizarJogador(_id, criarJogadorDto)
    }

    @Patch(':_id')
    @ApiOperation({summary: "Atualiza um jogador parcialmente pelo _id"})
    @ApiResponse({status: 204, description: "No Content."})
    @ApiResponse({status: 400, description: messagesJogadores.EMAIL_CADASTRADO})
    @ApiResponse({status: 404, description: messagesJogadores.JOGADOR_404})
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.NO_CONTENT)
    async atualizarJogadorParcialmente(@Param('_id', MongoIdValidationPipe) _id, @Body() atualizarJogadorDto: AtualizarJogadorDto) {
        await this.jogadoresService.atualizarJogadorParcialmente(_id, atualizarJogadorDto)
    }

    @Get()
    @ApiResponse({status: 200, description: "Lista de jogadores retornada com sucesso.", type: JogadorResponse, isArray: true})
    @ApiOperation({summary: "Lista todos os jogadores"})
    async consultarJogadores(): Promise<Array<Jogador>> {
        return this.jogadoresService.consultarJogadores()
    }

    @Get(':_id')
    @ApiResponse({status: 200, description: "Jogador retornado com sucesso.", type: JogadorResponse})
    @ApiResponse({status: 404, description: messagesJogadores.JOGADOR_404})
    @ApiOperation({summary: "Consulta um jogador pelo _id"})
    async consultarJogador(@Param('_id', MongoIdValidationPipe) _id): Promise<Jogador | HttpException> {
        return await this.jogadoresService.consultarJogador(_id)
    }

    @Delete(':_id')
    @ApiResponse({status: 204, description: "Jogador deletado com sucesso."})
    @ApiResponse({status: 404, description: messagesJogadores.JOGADOR_404})
    @ApiOperation({summary: "Excluí um jogador pelo _id"})
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletarJogador(@Param('_id', MongoIdValidationPipe) _id): Promise<void | HttpException> {
        await this.jogadoresService.deletarJogador(_id)
    }
}
