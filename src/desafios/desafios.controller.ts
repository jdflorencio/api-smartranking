import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from "@nestjs/common";
import { DesafiosService } from "./desafios.service";
import { CriarDesafioDto } from "./dtos/criar-desafio.dto";
import { AtualizarDesafioDto } from "./dtos/atualizar-desafio.dto";
import { AtribuirDesafiosPartidasDto } from "./dtos/atribuir-desafios-partidas.dto";
import { Desafio } from "./interfaces/desafio.interface";
import { ApiTags } from "@nestjs/swagger";
import { ValidacaoParametrosPipe } from "src/common/pipes/validacao-parametros.pipe";
import { DesafioStatusValidacaoPipe } from "./pipes/desafio-status-validacao.pipe";
import { Partida } from "src/partidas/interfaces/partida.interface";
@ApiTags("Desafios")
@Controller("api/v1/desafios")
export class DesafiosController {
  constructor(private readonly service: DesafiosService) {}

  @Post()
  async save(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    return await this.service.criar(criarDesafioDto);
  }

  @Post(`/:desafio/partida/`)
  async atribuirPartidaDesafio(
    @Param("desafio") _id: string,
    @Body(ValidationPipe) atribuirDesafiosPartidasDto: AtribuirDesafiosPartidasDto
  ): Promise<Partida> {
    return await this.service.atribuirPartidaDesafio(_id, atribuirDesafiosPartidasDto);
  }

  @Put(`/:desafio`)
  @UsePipes(ValidationPipe)
  async update(
    @Param("desafio", ValidacaoParametrosPipe) _id: string,
    @Body(DesafioStatusValidacaoPipe) atualizaDesafioDto: AtualizarDesafioDto
  ): Promise<Desafio> {
    return await this.service.atualizar(_id, atualizaDesafioDto);
  }

  @Get(`/:_id`)
  @UsePipes(ValidationPipe)
  async getBydId(
    @Param("_id", ValidacaoParametrosPipe) _id: string
  ): Promise<Desafio> {
    return await this.service.getById(_id);
  }

  @Get()
  async getAll(@Query("idJogador") _id: string): Promise<Desafio[] | Desafio> {
    return _id
      ? await this.service.getJogadorDesafio(_id)
      : await this.service.getGetAll();
  }

  @Delete(`/:desafio`)
  async delete(@Param("desafio") _id: string): Promise<void> {
    return await this.service.deleteById(_id);
  }
}
