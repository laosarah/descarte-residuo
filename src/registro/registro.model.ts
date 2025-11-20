import * as mongoose from 'mongoose';

export const RegistroSchema = new mongoose.Schema({
    nomeUsuario: { type: String, required: true },
    pontoDescarteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descarte',
        required: true
    },
    tipoResiduo: { 
        type: [String], 
        required: true,
        enum: ['plástico', 'papel', 'orgânico', 'eletrônico', 'vidro']
    },
    dataDescarte: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface Registro extends mongoose.Document {
    id: string;
    nomeUsuario: string;
    pontoDescarteId: string;
    tipoResiduo: string[];
    dataDescarte: Date;
}
