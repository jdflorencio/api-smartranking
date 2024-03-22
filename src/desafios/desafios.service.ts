import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CriarDesafioDto } from "./dtos/criar-desafio.dto";
import { AtualizarDesafioDto } from "./dtos/atualizar-desafio.dto";
import { Desafio, DesafiosStatus } from "./interfaces/desafio.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JogadoresService } from "src/jogadores/jogadores.service";
import { CategoriasService } from "src/categorias/categorias.service";
import { AtribuirDesafiosPartidasDto } from "./dtos/atribuir-desafios-partidas.dto";

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel("Desafio") private readonly desafioModel: Model<Desafio>,
    private readonly jogadorService: JogadoresService,
    private readonly categoriaService: CategoriasService
  ) {}

  private async verificarJogador(_id: string): Promise<void> {
    await this.jogadorService.getById(_id);
  }

  private async solicitanteCategoria(_id: string): Promise<void> {
    const categorias = await this.categoriaService.getAll();
    const jogadorCategoria = categorias.find((c) =>
      c.jogadores.find((j) => j._id == _id)
    );

    if (!jogadorCategoria) {
      throw new NotFoundException(
        `Solicitante não foi encontrado em categorias`
      );
    }
  }
  async criar(desafioDto: CriarDesafioDto): Promise<Desafio> {
    const { solicitante } = desafioDto;

    await this.solicitanteCategoria(solicitante._id);
    await this.verificarJogador(solicitante._id);

    const desafio = new this.desafioModel(desafioDto);
    desafio.status = DesafiosStatus.PENDENTE;
    desafio.categoria = "A";
    return await desafio.save();
  }

  async atualizar(
    _id: string,
    desafioDto: AtualizarDesafioDto
  ): Promise<Desafio> {
    try {
      const findDesafio = await this.desafioModel.findById(_id).exec();
      if (!findDesafio) throw new NotFoundException(`Desafio não encontrado`);

      findDesafio;
      if (
        findDesafio.status == DesafiosStatus.PENDENTE ||
        DesafiosStatus.REALIZADO
      ) {
        throw new BadRequestException(
          `Status PENDENTE E REALIZADO não podem ser alterado.`
        );
      }

      return await this.desafioModel.findByIdAndUpdate(
        { _id },
        { $set: desafioDto }
      );
    } catch (error) {
      throw error;
    }
  }

  async getById(_id: string): Promise<Desafio> {
    let findDesafio: Desafio = await this.desafioModel.findById(_id).exec();
    if (!findDesafio) {
      findDesafio = await this.getJogadorDesafio(_id);
    }

    if (!findDesafio) throw new NotFoundException(`Desafio não Foi encontrado`);

    return findDesafio;
  }

  async getJogadorDesafio(_id: string): Promise<Desafio> {
    const query = {
      jogadores: {
        $elemMatch: {
          $eq: _id,
        },
      },
    };
    return await this.desafioModel.findOne(query).exec();
  }

  async getGetAll(): Promise<Desafio[]> {
    return await this.desafioModel.find().exec();
  }

  async atribuirPartidaDesafio(
    _id: string,
    atribuirDesafiosPartidasDto: AtribuirDesafiosPartidasDto
  ): Promise<void> {
    await this.desafioModel.updateOne(
      { _id },
      { $set: AtribuirDesafiosPartidasDto }
    );
  }

  async deleteById(_id: string): Promise<void> {
    await this.desafioModel.deleteOne({ _id }).exec();
  }
}
