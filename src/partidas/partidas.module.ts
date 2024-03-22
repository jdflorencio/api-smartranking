import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DesafioSchema } from "src/desafios/interfaces/desafio.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Partida",
        schema: DesafioSchema,
      },
    ]),
  ],
})
export class PartidasModule {}
