import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafioSchema } from './interface/desafio.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Desafio', schema: DesafioSchema}]), CategoriasModule],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
