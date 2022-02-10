import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: 
  [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI,
      {useNewUrlParser: true,  useUnifiedTopology: true}),  
    JogadoresModule, CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
