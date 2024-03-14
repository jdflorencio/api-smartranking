import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly service: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    return this.service.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async getByEmail(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (!email) return this.service.getAll();
    return this.service.getByEmail(email);
  }

  @Delete()
  async remove(@Query('email') email: string): Promise<void> {
    this.service.removeByEmail(email);
  }
}
