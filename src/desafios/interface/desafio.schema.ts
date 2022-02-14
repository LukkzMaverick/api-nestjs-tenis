import { Schema } from 'mongoose'
export const DesafioSchema = new Schema({
    dataHoraDesafio: Date,
    status: {
        type: String, 
        enum: ["PENDENTE", "ACEITO", "RECUSADO"]
    },
    dataHoraSolitacao: Date,
    dataHoraResposta: Date,
    solicitante: { type: Schema.Types.ObjectId, ref: "Jogador" },
    categoria: String,
    jogadorDesafiado: { type: Schema.Types.ObjectId, ref: "Jogador" },
    partida: { type: Schema.Types.ObjectId, ref: "Partida" }
}, { timestamps: true, collection: 'desafios' })