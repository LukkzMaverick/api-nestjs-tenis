import { Schema } from "mongoose"

export const CategoriaSchema = new Schema({
    categoria: {type: String, unique: true},
    descricao: String,
    eventos: [
        {
            nome: String,
            operacao: {
                type: String,
                enum : ['+','-'],
            },
            valor: Number
        }
    ],
    jogadores: [{
        type: Schema.Types.ObjectId,
        ref: "Jogador"
    }],
    posicaoRanking: Number,
    urlFotoJogador: String,
}, {timestamps: true, collection: "categorias"})
