import * as mongoose from "mongoose";

export const DescarteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bairro: { type: String},
    local: { 
        type: String, 
        required: true,
        enum: ['público', 'privado'] 
    },
    categoria: { 
        type: [String], 
        required: true, 
        enum: ['plástico', 'papel', 'orgânico', 'eletrônico', 'vidro']
    },
    geolocalizacao: { 
        latitude: { type: Number, required: true}, 
        longitude: { type: Number, required: true } 
    }
});

export interface Descarte extends mongoose.Document {
    id: string;
    name: string;
    bairro: string;
    local: 'público' | 'privado';
    categoria: string[];
    geolocalizacao: {
        latitude: number, 
        longitude: number
    };
}