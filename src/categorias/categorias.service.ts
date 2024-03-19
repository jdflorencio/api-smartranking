import { BadRequestException, Injectable } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categorias.dto';
import { AtualizaCategoriaDto } from './dtos/atualiza-categoria.dto';
import { Categoria } from './interfaces/categorias.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  async criar(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const findCategoria = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (findCategoria)
      throw new BadRequestException(
        `Essa Categoria já está cadastrada: ${findCategoria}`,
      );

    const categoriaSave = new this.categoriaModel(criarCategoriaDto);
    return await categoriaSave.save();
  }

  async atualizar(
    id: string,
    atualizarCategoriaDto: AtualizaCategoriaDto,
  ): Promise<Categoria> {
    await this.categoriaModel.findByIdAndUpdate(id, atualizarCategoriaDto);
  }
}
