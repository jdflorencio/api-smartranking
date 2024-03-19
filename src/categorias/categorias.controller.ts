import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categorias.dto';
import { CategoriasService } from './categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly service: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    return await this.service.save(criarCategoriaDto);
  }
}
