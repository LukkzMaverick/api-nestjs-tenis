import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria, Evento } from './interfaces/categoria.interface';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { messagesCategorias } from './messages/messagesCategorias';
import { AdicionarEventoResponse } from './interfaces/responses/adicionarEventoResponse';
import { AtualizarDescricaoCategoria } from './dto/atualizar-descricao-categoria.dto';
import { messagesJogadores } from 'src/jogadores/messages/messagesJogadores';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel("Categoria") private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto
        const categoriaJaExistente = await this.categoriaModel.findOne({ categoria })
        if (categoriaJaExistente) throw new BadRequestException(messagesCategorias.CATEGORIA_CADASTRADA)
        const CategoriaNova = new this.categoriaModel(criarCategoriaDto)
        return await CategoriaNova.save()
    }

    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate({ path: 'jogadores', select: 'nome' })
    }

    async consultarCategoriaPeloId(_id: string): Promise<Categoria> {
        const categoria = this.categoriaModel.findById(_id).populate({ path: 'jogadores', select: 'nome' })
        if (!categoria) throw new NotFoundException(messagesCategorias.CATEGORIA_404)
        return await categoria
    }

    async atualizarDescricaoCategoria(_id: string, atualizarDescricaoCategoria: AtualizarDescricaoCategoria): Promise<void>{
        const { matchedCount } = await this.categoriaModel.updateOne({ _id }, {
            $set: { descricao: atualizarDescricaoCategoria.descricao }
        })
        if (matchedCount < 1) throw new NotFoundException(messagesCategorias.CATEGORIA_404)
    }   

    async atribuirCategoriaAJogador(categoriaId: string, jogadorId: string): Promise<void>{
        const jogador = await this.jogadoresService.consultarJogador(jogadorId)
        if(!jogador) throw new NotFoundException(messagesJogadores.JOGADOR_404)
        const { matchedCount } = await this.categoriaModel.updateOne({_id: categoriaId}, {$addToSet: {jogadores: jogadorId}})
        if (matchedCount < 1) throw new NotFoundException(messagesCategorias.CATEGORIA_404)
    }

    async adicionarEvento(categoriaId: string, evento: Evento): Promise<AdicionarEventoResponse> {
        const eventoId = new Types.ObjectId();
        const { matchedCount } = await this.categoriaModel.updateOne({ _id: categoriaId }, {
            $push: { eventos: { ...evento, _id: eventoId } }
        })
        if (matchedCount < 1) throw new NotFoundException(messagesCategorias.CATEGORIA_404)
        return {_id: eventoId.toString()}
    }

    async removerEvento(categoriaId: string, eventoId: string): Promise<void> {
        const { matchedCount } = await this.categoriaModel.updateOne({ _id: categoriaId }, {
            $pull: { eventos: { _id: eventoId } }
        })
        if (matchedCount < 1) throw new NotFoundException(messagesCategorias.CATEGORIA_404)
    }

    async atualizarEvento(categoriaId: string, evento: Evento, idEvento: string): Promise<void> {
        const set = {}
        Object.keys(evento).forEach(key => {
            if(evento[key]) set[`eventos.$.${key}`] = evento[key]
        })
        const { matchedCount } = await this.categoriaModel.updateOne({ _id: categoriaId, eventos: {$elemMatch: {_id: idEvento} }}, {$set: set})
        if (matchedCount < 1) throw new NotFoundException(messagesCategorias.CATEGORIA_EVENTO_404)
    }
}
