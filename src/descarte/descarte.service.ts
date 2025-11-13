import { Injectable, NotFoundException } from '@nestjs/common';
import { Descarte } from './descarte.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DescarteService {
    constructor( @InjectModel('Descarte') private readonly descarteModel: Model<Descarte>) {}

    // CREATE
    async createDescarte(data: Omit<Descarte, 'id'>) {
        const descarteModel = new this.descarteModel({
            name: data.name,
            bairro: data.bairro,
            local: data.local,
            categoria: data.categoria,
            geolocalizacao: data.geolocalizacao,
        });
        const result = await descarteModel.save();
        return result._id as string;
    }

    // READ
    async getDescarte() {
        const descartes = await this.descarteModel.find().exec();
        return descartes;
    }

    // UPDATE
    async updateDescarte(id: string, newName?: string) {
        const updatedDescarte = await this.descarteModel.findById(id).exec();
        if (!updatedDescarte) {
            throw new NotFoundException('Descarte not found');
        }
        if (newName) {
            updatedDescarte.name = newName;
        }
        const result = await updatedDescarte.save();

        return {
            id: result._id,
            name: result.name
        }
    }

    // DELETE
    async deleteDescarte(id: string) {
        const result = await this.descarteModel.deleteOne({_id: id}).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not delete descarte.');
        }
        return { message: 'Descarte deleted successfully' };
    }
}
