import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

//esse classe passou a ser um provider
@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(
    criaJogadorDto: CriarJogadorDto,
  ): Promise<string> {
    try {
      const { email } = criaJogadorDto;
      const jogadorFind = this.jogadores.find(
        (jogador) => jogador.email === email,
      );

      if (jogadorFind) {
        this.atualizar(jogadorFind, criaJogadorDto);
      } else {
        this.criar(criaJogadorDto);
        return 'Criado com Sucesso';
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const { name, email, phoneNumber } = criaJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlPhotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`CriarJogadoresDto: ${criaJogadorDto}`);
    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criaJogadorDto: CriarJogadorDto,
  ): void {
    //const { name:  } = jogadorEncontrado;
    const { name } = criaJogadorDto;
    jogadorEncontrado.name = name;
  }

  async getAll(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async getByEmail(email: string): Promise<Jogador> {
    try {
      const jogador = this.jogadores.find((jogador) => jogador.email === email);
      if (!jogador)
        throw new NotFoundException(`Jogador com email ${email} not found`);
      return jogador;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeByEmail(email: string): Promise<string> {
    const jogadorEncontrado = this.jogadores.findIndex(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      this.jogadores.splice(jogadorEncontrado, 1);
      return 'Removido com sucesso';
    }
  }
}
