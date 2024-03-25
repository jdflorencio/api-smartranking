import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DesafioSchema } from "src/desafios/interfaces/desafio.schema";
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Partida",
        schema: DesafioSchema,
      },
    ]),
  ],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
