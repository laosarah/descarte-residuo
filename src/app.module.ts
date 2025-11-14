import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DescarteModule } from './descarte/descarte.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistroModule } from './registro/registro.module';

@Module({
  imports: [DescarteModule, MongooseModule.forRoot('mongodb+srv://sarah:123456789s@cluster0.9bpsufp.mongodb.net/?appName=Cluster0'), RegistroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
