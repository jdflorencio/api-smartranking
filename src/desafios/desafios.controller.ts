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
} from "@nestjs/common";
import { DesafiosService } from "./desafios.service";
import { CriarDesafioDto } from "./dtos/criar-desafio.dto";
import { AtualizarDesafioDto } from "./dtos/atualizar-desafio.dto";
import { AtribuirDesafiosPartidasDto } from "./dtos/atribuir-desafios-partidas.dto"
import { Desafio } from "./interfaces/desafio.interface";
import { ApiTags } from "@nestjs/swagger";
import { ValidacaoParametrosPipe } from "src/common/pipes/validacao-parametros.pipe";
@ApiTags("Desafios")
@Controller("api/v1/desafios")
export class DesafiosController {
  constructor(private readonly service: DesafiosService) {}

  @Post()
  async save(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    return await this.service.criar(criarDesafioDto);
  }

  @Put(`/:_id`)
  @UsePipes(ValidationPipe)
  async update(
    @Param("id", ValidacaoParametrosPipe) _id: string,
    @Body() atualizaDesafioDto: AtualizarDesafioDto
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

  /*@Get(`/:_id`)
  @UsePipes(ValidationPipe)
  async getJogadordesafio(
    @Param('id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Desafio> {
    return await this.service.getJogadorDesafio(_id);
  }*/

  @Get()
  async getAll(): Promise<Desafio[]> {
    return await this.service.getGetAll();
  }

  @Post(`/:_id`)
  async atribuirPartidaDesafio(
    @Param("_id") _id: string,
    @Body() atribuirDesafiosPartidasDto: AtribuirDesafiosPartidasDto
  ): Promise<void> {
    await this.service.atribuirPartidaDesafio(_id, atribuirDesafiosPartidasDto);
  }

  @Delete(`/:_id`)
  async delete(@Param("_id") _id: string): Promise<void> {
    return await this.service.deleteById(_id);
  }
}
