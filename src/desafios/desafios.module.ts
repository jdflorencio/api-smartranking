import { Module } from "@nestjs/common";
import { DesafioSchema } from "./interfaces/desafio.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { JogadoresModule } from "src/jogadores/jogadores.module";
import { CategoriasModule } from "src/categorias/categorias.module";
import { DesafiosController } from "./desafios.controller";
import { DesafiosService } from "./desafios.service";
import { PartidaSchema } from "./interfaces/partida.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Desafio", schema: DesafioSchema }]),
    MongooseModule.forFeature([{ name: "Partida", schema: PartidaSchema }]),
    JogadoresModule,
    CategoriasModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
