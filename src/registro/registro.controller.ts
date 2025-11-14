import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { Registro } from './registro.model';

type CreateRegistroDTO = Omit<Registro, 'id' | 'dataDescarte'>;

@Controller('registro')
export class RegistroController {
    constructor(private readonly registroService: RegistroService) {}

    @Post()
    async createRegistro(@Body() registroData: CreateRegistroDTO): Promise<{ id: string }> {
        console.log('novo registro', registroData);
        const id = await this.registroService.createRegistro(registroData);
        return {id};
    }
    
    @Get('historico')
    async getHistorico(
        @Query('pontoId') pontoId: string, 
        @Query('usuario') usuario: string,
        @Query('residuos') residuos: string,
        @Query('data') data: string
    ) {
        const filtros = { pontoId, usuario, residuos, data };
        return this.registroService.getHistorico(filtros);
    }

    @Get('relatorio')
    async getRelatorio() {
        return this.registroService.getRelatorio();
    }
}
