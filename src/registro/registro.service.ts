import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Registro } from './registro.model';
import { Descarte } from 'src/descarte/descarte.model';

@Injectable()
export class RegistroService {
    constructor(
        @InjectModel('Registro') private readonly registroModel: Model<Registro>,
        @InjectModel('Descarte') private readonly descarteModel: Model<Descarte>,
    ) {}

    async createRegistro(data: Omit<Registro, 'id' | 'dataDescarte'>) {
        const novoRegistro = new this.registroModel({
            nomeUsuario: data.nomeUsuario,
            pontoDescarteId: data.pontoDescarteId,
            tipoResiduo: data.tipoResiduo
        });
        const result = await novoRegistro.save();
        return result._id as string;
    }

    async getHistorico(filtros: any = {}) {
        const query: any = {};

        if (filtros.pontoId) query.pontoDescarteId = filtros.pontoId;
        if (filtros.usuario) query.nomeUsuario = filtros.usuario;
        if (filtros.residuos) query.tipoResiduo = filtros.residuos;
        if (filtros.data) query.dataDescarte = filtros.data;

        const registros = await this.registroModel.find(query);
        console.log('registros', registros);
        return registros;
}

    async getRelatorio() {
        const totalRegistros = await this.registroModel.countDocuments().exec();
        const DescarteModel = mongoose.model('Descarte');
        const totalPontosCadastrados = await DescarteModel.countDocuments().exec();
        const tiposResiduos = await this.registroModel.distinct('tipoResiduo').exec();
        const totalUsuariosUnicos = (await this.registroModel.distinct('nomeUsuario').exec()).length;
        const trintaDiasAtras = new Date();
        trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
        const descartesUltimos30 = await this.registroModel.countDocuments({dataDescarte: { $gte: trintaDiasAtras }}).exec();

        return {
            totalRegistros: totalRegistros,
            totalPontosCadastrados: totalPontosCadastrados,
            totalUsuariosUnicos: totalUsuariosUnicos,
            descartesUltimos30Dias: descartesUltimos30,
            tiposResiduosRegistrados: tiposResiduos.flat()
        };
    }
}


