import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { ApiTags } from '@nestjs/swagger';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@ApiTags('Jogadores')
@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly service: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criar(@Body() criarJogadorDto: CriarJogadorDto) {
    return this.service.criar(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizar(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    await this.service.atualizar(_id, criarJogadorDto);
  }

  @Get()
  async getAll(): Promise<Jogador[]> {
    return this.service.getAll();
  }

  @Get('/:_id')
  async getById(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return this.service.getById(_id);
  }

  @Delete('/:_id')
  async remove(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    this.service.removeById(_id);
  }
}
