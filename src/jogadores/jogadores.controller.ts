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
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { ApiTags } from '@nestjs/swagger';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

@ApiTags('Jogadores')
@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly service: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criar(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return this.service.criar(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizar(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    await this.service.atualizar(_id, atualizarJogadorDto);
  }

  @Get()
  async getAll(): Promise<Jogador[]> {
    return this.service.getAll();
  }

  @Get('/:_id')
  async getById(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return this.service.getById(_id);
  }

  @Delete('/:_id')
  async remove(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    this.service.removeById(_id);
  }
}
