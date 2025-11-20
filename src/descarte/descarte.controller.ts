import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DescarteService } from './descarte.service';
import { Descarte } from './descarte.model';

@Controller('descarte')
export class DescarteController {
    constructor(private readonly descarteService: DescarteService ) {}
    
    @Get()
    getDescarte(): Promise<any> {
        return this.descarteService.getDescarte();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.descarteService.getById(id);
    }

    @Post()
    async createDescarte(@Body() descarteData: Omit<Descarte, 'id'>): Promise<{ id: string }> {
        console.log('Requisição recebida:', descarteData);
        const result = await this.descarteService.createDescarte(descarteData);
        return { id: result };

    }

    @Patch(':id') 
    async updateDescarte(@Param('id') id: string, @Body() updateData: { name?: string }): Promise<any> {
        await this.descarteService.updateDescarte(id, updateData.name);
        return { message: 'Atualização iniciada.' };
    }

    @Delete(':id')
    async deleteDescarte(@Param('id') id: string) {
        console.log('ID to delete:', id);
        await this.descarteService.deleteDescarte(id);
        return null;
    }
}