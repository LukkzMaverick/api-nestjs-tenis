import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interface/desafio.interface';
import { messagesDesafios } from './messages/messagesDesafios';
import { JogadoresService } from './../jogadores/jogadores.service';

@Injectable()
export class DesafiosService {

    constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>, private readonly categoriasService: CategoriasService, private readonly jogadoresService: JogadoresService) { }

    async criarDesafio(criarDesafioDto: CriarDesafioDto) {
        if(criarDesafioDto.solicitante === criarDesafioDto.jogadorDesafiado) throw new ForbiddenException(messagesDesafios.JOGADOR_NAO_PODE_DESAFIAR_A_SI_MESMO)
        const arrayIds = [criarDesafioDto.solicitante, criarDesafioDto.jogadorDesafiado]
        const categoria = await this.categoriasService.consultarJogadoresEmCategoria(arrayIds)
        if (await this.jogadoresJaTemDesafioPendente(arrayIds)) throw new ForbiddenException(messagesDesafios.JOGADORES_TEM_DESAFIO_PENDENTE)
        const desafio = new this.desafioModel({ ...criarDesafioDto, categoria: categoria._id })
        return await desafio.save()
    }

    private async jogadoresJaTemDesafioPendente(arrayIdsJogadores: Array<string>): Promise<boolean> {
        const desafio = await this.desafioModel.findOne({
            $or: [{
                solicitante: arrayIdsJogadores[0],
                jogadorDesafiado: arrayIdsJogadores[1],
                status: 'PENDENTE'
            }, {
                solicitante: arrayIdsJogadores[1],
                jogadorDesafiado: arrayIdsJogadores[0],
                status: 'PENDENTE'
            }]
        })
        if (desafio) return true
        return false
    }
}
