import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.MONGODB_URI);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
