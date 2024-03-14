import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

//esse classe passou a ser um provider
@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    try {
      const { email } = criaJogadorDto;
      const jogadorFind = await this.jogadores.find(
        (jogador) => jogador.email === email,
      );

      if (jogadorFind) {
        this.atualizar(jogadorFind, criaJogadorDto);
      } else {
        this.criar(criaJogadorDto);
      }
    } catch (error) {
      console.log(error);
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
}
