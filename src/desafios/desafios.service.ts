import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interface/desafio.interface';

@Injectable()
export class DesafiosService {

    constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>, categoriasService: CategoriasService){}

    async criarDesafio(criarDesafioDto: CriarDesafioDto){
        const solicitante = await this.desafioModel.findById(criarDesafioDto.solicitante)
        const jogadorDesafiado = await this.desafioModel.findById(criarDesafioDto.jogadorDesafiado)
        if(!solicitante || !jogadorDesafiado) throw new NotFoundException("Pelo menos um dos jogadores não está cadastrado na base de dados.")
        const desafio = new this.desafioModel(criarDesafioDto)
        return await desafio.save()
    }
}
