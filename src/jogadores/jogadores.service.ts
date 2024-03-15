import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//esse classe passou a ser um provider
@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(
    criaJogadorDto: CriarJogadorDto,
  ): Promise<string> {
    try {
      const { email } = criaJogadorDto;
      const jogadorFind = await this.jogadorModel.findOne({ email }).exec();
      if (jogadorFind) {
        await this.atualizar(criaJogadorDto);
      } else {
        await this.criar(criaJogadorDto);
        return 'Criado com Sucesso';
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
  }

  private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel.findOneAndUpdate(
      { email: criaJogadorDto.email },
      { $set: criaJogadorDto },
    );
  }

  async getAll(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async getByEmail(email: string): Promise<Jogador> {
    try {
      const jogador = await this.jogadorModel.findOne({ email }).exec();
      if (!jogador)
        throw new NotFoundException(`Jogador com email ${email} not found`);
      return jogador;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeByEmail(email: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }
}
