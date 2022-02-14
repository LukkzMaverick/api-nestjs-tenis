import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { CategoriasService } from './categorias.service';
import { Categoria } from './interfaces/categoria.interface';
import { MongoIdValidationPipe } from '../common/pipes/mongoIdValidation.pipe';
import { CategoriaResponse } from './swagger/categoriaResponse';
import { messagesCategorias } from './messages/messagesCategorias';
import { AdicionarEventoResponse } from './interfaces/responses/adicionarEventoResponse';
import { MongoID } from '../common/swaggerModels/MongoID';
import { EventoDto as Evento } from './dto/evento.dto';
import { EventoPatchDto } from './dto/evento-patch.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AtualizarDescricaoCategoria } from './dto/atualizar-descricao-categoria.dto';

@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriaService: CategoriasService){}

    @Post()
    @ApiOperation({summary: "Cria uma nova categoria"})
    @ApiResponse({status: 201, description: "Nova categoria criada com sucesso.", type: CategoriaResponse})
    @ApiResponse({status: 400, description: messagesCategorias.CATEGORIA_CADASTRADA})
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{
        return await this.categoriaService.criarCategoria(criarCategoriaDto)
    }

    @Get()
    @ApiOperation({summary: "Lista todas as categorias"})
    @ApiResponse({status: 200, description: "Categorias recuperadas com sucesso.", type: CategoriaResponse, isArray: true})
    async consultarCategorias(): Promise<Array<Categoria>>{
        return await this.categoriaService.consultarCategorias()
    }

    @Get(':_id')
    @ApiOperation({summary: "Recupera uma categoria"})
    @ApiResponse({status: 200, description: "Categoria recuperada com sucesso.", type: CategoriaResponse})
    @ApiResponse({status: 404, description: messagesCategorias.CATEGORIA_404})
    async consultarCategoriaPeloId(@Param('_id', MongoIdValidationPipe) _id: string): Promise<Categoria>{
        return await this.categoriaService.consultarCategoriaPeloId(_id)
    }

    @Put(":categoriaId/descricao")
    @ApiOperation({summary: "Atualiza a descricao de uma categoria pelo id da categoria"})
    @ApiResponse({status: 204, description: "No content."})
    @ApiResponse({status: 404, description: messagesCategorias.CATEGORIA_404})
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(ValidationPipe)
    async atualizarDescricaoCategoria(@Param("categoriaId", MongoIdValidationPipe) categoriaId: string, @Body() atualizarDescricaoCategoria: AtualizarDescricaoCategoria): Promise<void>{
        return await this.categoriaService.atualizarDescricaoCategoria(categoriaId, atualizarDescricaoCategoria)
    }

    
    @Post(':categoriaId/eventos')
    @ApiOperation({summary: "Adiciona um novo evento a uma categoria e retorna o _idEvento"})
    @ApiResponse({status: 201, description: "Evento adicionado com sucesso.", type: MongoID})
    @ApiResponse({status: 404, description: messagesCategorias.CATEGORIA_404})
    @UsePipes(ValidationPipe)
    async adicionarEvento(@Param("categoriaId", MongoIdValidationPipe) categoriaId: string, @Body() evento: Evento): Promise<AdicionarEventoResponse>{
        return await this.categoriaService.adicionarEvento(categoriaId, evento)
    }

    @Delete(':categoriaId/eventos/:eventoId')
    @ApiOperation({summary: "Remove um evento de uma categoria e retorna 204"})
    @ApiResponse({status: 204, description: "No Content."})
    @ApiResponse({status: 404, description: messagesCategorias.CATEGORIA_404})
    @HttpCode(HttpStatus.NO_CONTENT)
    async removerEvento(@Param("categoriaId", MongoIdValidationPipe) categoriaId: string, @Param("eventoId", MongoIdValidationPipe) eventoId: string): Promise<void>{
        return await this.categoriaService.removerEvento(categoriaId, eventoId)
    }

    @Patch(':categoriaId/eventos/:eventoId')
    @ApiOperation({summary: "Atualiza um evento de uma categoria e retorna 204"})
    @ApiResponse({status: 204, description: "No Content."})
    @ApiResponse({status: 404, description: messagesCategorias.CATEGORIA_404})
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(ValidationPipe)
    async atualizarEvento(@Param("categoriaId", MongoIdValidationPipe) categoriaId: string, @Param("eventoId", MongoIdValidationPipe) eventoId: string, @Body() evento: EventoPatchDto): Promise<void>{
        return await this.categoriaService.atualizarEvento(categoriaId, evento, eventoId)
    }

    @Post('/:categoriaId/jogadores/:jogadorId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async atribuirCategoriaAJogador(@Param("categoriaId", MongoIdValidationPipe) categoriaId: string, @Param("jogadorId", MongoIdValidationPipe) jogadorId: string): Promise<void>{
        return await this.categoriaService.atribuirCategoriaAJogador(categoriaId, jogadorId)
    }
}
