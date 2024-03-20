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
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
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
        throw new NotFoundException(`Categoria Não foi encontrada`);

      return await this.categoriaModel.findByIdAndUpdate(
        { _id },
        { $set: atualizarCategoriaDto },
      );
    } catch (error) {
      Promise.reject(error);
    }
  }

  async getById(id: string): Promise<Categoria> {
    return await this.categoriaModel.findById(id).populate('jogadores').exec();
  }

  async getAll(): Promise<Categoria[]> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async setJogadorCategoria(params: string[]): Promise<any> {
    try {
      const categoria = params[`categoria`];
      const idJogador = params[`idJogador`];

      const findCategoria = await this.categoriaModel
        .findOne({ categoria })
        .exec();

      if (!findCategoria)
        throw new BadRequestException('Categoria não foi encontrada');

      await this.jogadoresService.getById(idJogador);

      const JogadoresInCategoria = await this.categoriaModel
        .findOne({ categoria })
        .where('jogadores')
        .in(idJogador)
        .exec();

      if (JogadoresInCategoria)
        throw new BadRequestException(
          `Jogador já está Cadastrado na categoria ${categoria}`,
        );

      findCategoria.jogadores.push(idJogador);

      await this.categoriaModel
        .findOneAndUpdate({ categoria }, { $set: findCategoria })
        .exec();
    } catch (error) {
      throw error;
    }
  }
}
