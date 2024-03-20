import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { ApiTags } from '@nestjs/swagger';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
@ApiTags('Desafios')
@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly service: DesafiosService) {}

  @Post()
  async save(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    return this.service.criar(criarDesafioDto);
  }

  @Put(`/:_id`)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ValidacaoParametrosPipe) _id: string,
    @Body() atualizaDesafioDto: AtualizarDesafioDto,
  ): Promise<Desafio> {
    return this.service.atualizar(_id, atualizaDesafioDto);
  }

  @Get(`/:_id`)
  @UsePipes(ValidationPipe)
  async getBydId(
    @Param('id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Desafio> {
    return this.service.getById(_id);
  }

  @Get()
  async getAll(): Promise<Desafio[]> {
    return this.service.getGetAll();
  }
}
