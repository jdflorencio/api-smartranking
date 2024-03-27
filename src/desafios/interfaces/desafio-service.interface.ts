import { CriarDesafioDto } from "../dtos/criar-desafio.dto";
import { AtualizarDesafioDto } from "../dtos/atualizar-desafio.dto";
import { Desafio } from "./desafio.interface";
import { AtribuirDesafiosPartidasDto } from "../dtos/atribuir-desafios-partidas.dto";
import { Partida } from "../interfaces/partida.interface";

export interface DesafiosServiceInterface {
  criar(desafioDto: CriarDesafioDto): Promise<Desafio>;
  atualizar(_id: string, desafioDto: AtualizarDesafioDto): Promise<Desafio>;
  getById(_id: string): Promise<Desafio>;
  getGetAll(): Promise<Desafio[]>;
  atribuirPartidaDesafio(
    _id: string,
    atribuirDesafiosPartidasDto: AtribuirDesafiosPartidasDto
  ): Promise<Partida>;
  deleteById(_id: string): Promise<void>;
}
