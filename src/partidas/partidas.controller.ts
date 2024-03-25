import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriarPartidaDto } from "./dtos/criar-partidas.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Partidas")
@Controller("partidas")
export class PartidasController {
  constructor() {}

  @Post() 
  async criar(@Body() criarPartidaDto: CriarPartidaDto ) : Promise<void> {
    console.log({criarPartidaDto})
  }
}
