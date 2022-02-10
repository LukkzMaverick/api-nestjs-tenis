import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Injectable, Logger, BadRequestException, NotFoundException  } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messagesJogadores } from './messages/messagesJogadores';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}
    
    private readonly logger = new Logger()

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{
        const {email} = criarJogadorDto
        const jogadorJaExiste = await this.jogadorModel.findOne({email})
        if(jogadorJaExiste) throw new BadRequestException(messagesJogadores.EMAIL_CADASTRADO)
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save()
    }

    async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<void>{
        const {email} = criarJogadorDto
        const jogador = await this.jogadorModel.findOne({email})
        if(jogador && jogador._id.toString() !== _id) throw new BadRequestException(messagesJogadores.EMAIL_CADASTRADO)
        const {matchedCount} = await this.jogadorModel.updateOne({_id}, {
            $set: criarJogadorDto
        })
        if(matchedCount < 1) throw new NotFoundException(messagesJogadores.JOGADOR_404)
    }

    async atualizarJogadorParcialmente(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void>{
        const {email} = atualizarJogadorDto
        const jogador = await this.jogadorModel.findOne({email})
        if(jogador && jogador._id.toString() !== _id) throw new BadRequestException(messagesJogadores.EMAIL_CADASTRADO)
        const set = {}
        Object.keys(atualizarJogadorDto).forEach(key => {
            if(atualizarJogadorDto[key]) set[`${key}`] = atualizarJogadorDto[key]
        })
        const { matchedCount } = await this.jogadorModel.updateOne({ _id}, {$set: set})
        if(matchedCount < 1) throw new NotFoundException(messagesJogadores.JOGADOR_404)
    }

    async consultarJogadores(): Promise<Array<Jogador>>{
        return await this.jogadorModel.find({});
    }

    async consultarJogador(_id: string): Promise<Jogador | any>{
        const jogador = await this.jogadorModel.findById(_id)
        if (jogador) return jogador
        throw new NotFoundException(messagesJogadores.JOGADOR_404)
    }

    async deletarJogador(_id: string): Promise<void>{
        const {deletedCount} = await this.jogadorModel.deleteOne({_id})
        if(deletedCount < 1) throw new NotFoundException(messagesJogadores.JOGADOR_404)
    }
}