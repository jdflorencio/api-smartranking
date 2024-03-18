import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//esse classe passou a ser um provider
@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;

    const findJogador = await this.jogadorModel.findOne({ email }).exec();

    if (findJogador)
      throw new BadRequestException(`Jogador com email ${email} cadastrado!`);

    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizar(
    _id: string,
    criaJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const findJogador = await this.jogadorModel.findById(_id).exec();

    if (!findJogador) throw new NotFoundException(`Jogador com email ${_id}`);

    return await this.jogadorModel.findOneAndUpdate(
      { _id },
      { $set: criaJogadorDto },
    );
  }

  async getAll(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async getById(_id: string): Promise<Jogador> {
    try {
      const jogador = await this.jogadorModel.findById(_id).exec();
      if (!jogador)
        throw new NotFoundException(`Jogador com email ${_id} not found`);
      return jogador;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeById(_id: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
