import { Schema } from "mongoose"

export const JogadorSchema = new Schema({
    celular: String,
    email: {
        type: String,
        unique: true
    },
    nome: String,
    ranking: String,
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    posicaoRanking: Number,
    urlFotoJogador: String,
}, {timestamps: true, collection: "jogadores"})

