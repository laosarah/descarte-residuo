import { Module } from '@nestjs/common';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service';
import { RegistroSchema } from './registro.model';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { DescarteSchema } from 'src/descarte/descarte.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Registro', schema: RegistroSchema }, { name: 'Descarte', schema: DescarteSchema }])],
  controllers: [RegistroController],
  providers: [RegistroService]
})
export class RegistroModule {}
