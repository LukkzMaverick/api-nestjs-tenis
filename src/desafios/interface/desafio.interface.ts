import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Desafio extends Document{
    dataHoraDesafio: string
    status: string
    dataHoraSolicitacao: string
    dataHoraResposta: string
    solicitante: Jogador,
    categoria: {_id: string, catgoria: string}
    jogadorDesafiado: string
    partida: Partida
}

export interface Partida extends Document{
    categoria: string
    jogadores: Array<string>
    def: Jogador
    resultado: Array<Resultado>
}

export interface Resultado {
    set: string
}