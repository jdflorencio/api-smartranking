import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
  Param,
  Put,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categorias.dto';
import { CategoriasService } from './categorias.service';
import { Categoria } from './interfaces/categorias.interface';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly service: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    return await this.service.criar(criarCategoriaDto);
  }

  @Put('/:_id')
  async atualizar(
    @Param('id') _id: string,
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    return await this.service.atualizar(_id, atualizarCategoriaDto);
  }

  @Get('/:_id')
  async getById(@Param('_id') _id: string): Promise<Categoria> {
    try {
      const categoria = await this.service.getById(_id);
      if (!categoria)
        throw new NotFoundException(`Categoria Não Foi encontrada`);

      return categoria;
    } catch (error) {
      Promise.reject(error);
    }
  }

  @Get()
  async getAll(): Promise<Categoria[]> {
    return await this.service.getAll();
  }

  @Post('/:categoria/jogadores/:idJogador')
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
    await this.service.setJogadorCategoria(params);
  }
}
