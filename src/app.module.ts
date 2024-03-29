import { Module } from "@nestjs/common";
import { JogadoresModule } from "./jogadores/jogadores.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { CategoriasModule } from "./categorias/categorias.module";
import { DesafiosModule } from "./desafios/desafios.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development"],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
