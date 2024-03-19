import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categorias.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
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
        `Essa Categoria já está cadastrada: "${findCategoria.categoria}"`,
      );

    const categoriaSave = new this.categoriaModel(criarCategoriaDto);
    return await categoriaSave.save();
  }

  async atualizar(
    _id: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    try {
      const findCategoria = await this.categoriaModel.findById(_id).exec();
      if (!findCategoria)
        throw new NotFoundException(
          `Categoria Não foi encontrada ${atualizarCategoriaDto.categoria}`,
        );

      return await this.categoriaModel.findByIdAndUpdate(
        { _id },
        { $set: atualizarCategoriaDto },
      );
    } catch (error) {
      Promise.reject(error);
    }
  }

  async getById(id: string): Promise<Categoria> {
    return this.categoriaModel.findById(id).exec();
  }

  async getAll(): Promise<Categoria[]> {
    return await this.categoriaModel.find().exec();
  }
}
