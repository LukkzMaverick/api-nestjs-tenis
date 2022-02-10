import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria, Evento } from './interfaces/categoria.interface';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { messagesCategorias } from './messages/messagesCategorias';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';
import { AdicionarEventoResponse } from './interfaces/responses/adicionarEventoResponse';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel("Categoria") private readonly categoriaModel: Model<Categoria>) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto
        const categoriaJaExistente = await this.categoriaModel.findOne({ categoria })
        if (categoriaJaExistente) throw new BadRequestException(messagesCategorias.CATEGORIA_CADASTRADA)
        const CategoriaNova = new this.categoriaModel(criarCategoriaDto)
        return await CategoriaNova.save()
    }

    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find()
    }

    async consultarCategoriaPeloId(_id): Promise<Categoria> {
        const categoria = this.categoriaModel.findById(_id)
        if (!categoria) throw new NotFoundException(messagesCategorias.CATEGORIA_404)
        return await categoria
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
        const { matchedCount, modifiedCount } = await this.categoriaModel.updateOne({ _id: categoriaId, eventos: {$elemMatch: {_id: idEvento} }}, {$set: set})
        console.log(matchedCount)
        console.log(modifiedCount)
    }
}
