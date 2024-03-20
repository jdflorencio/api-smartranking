import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly jogadorService: JogadoresService,
  ) {}

  private async verificarJogador(_id: string): Promise<void> {
    await this.jogadorService.getById(_id);
  }
  async criar(desafioDto: CriarDesafioDto): Promise<Desafio> {
    const { solicitante } = desafioDto;

    await this.verificarJogador(solicitante._id);

    const desafio = new this.desafioModel(desafioDto);
    return await desafio.save();
  }

  async atualizar(
    _id: string,
    desafioDto: AtualizarDesafioDto,
  ): Promise<Desafio> {
    try {
      const { solicitante } = desafioDto;
      await this.verificarJogador(solicitante._id);
      const findDesafio = await this.desafioModel.findById(_id).exec();
      if (!findDesafio) throw new NotFoundException(`Desafio não encontrado`);

      return await this.desafioModel.findByIdAndUpdate(
        { _id },
        { $set: desafioDto },
      );
    } catch (error) {
      throw error;
    }
  }

  async getById(_id: string): Promise<Desafio> {
    return await this.desafioModel.findById(_id).exec();
  }

  async getGetAll(): Promise<Desafio[]> {
    return await this.desafioModel.find().exec();
  }
}
