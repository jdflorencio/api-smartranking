import { CriarDesafioDto } from "../dtos/criar-desafio.dto";
import { AtualizarDesafioDto } from "../dtos/atualizar-desafio.dto";
import { Desafio } from "./desafio.interface";
import { AtribuirDesafiosPartidasDto } from "../dtos/atribuir-desafios-partidas.dto";

export interface DesafiosServiceInterface {
  criar(desafioDto: CriarDesafioDto): Promise<Desafio>;
  atualizar(_id: string, desafioDto: AtualizarDesafioDto): Promise<Desafio>;
  getById(_id: string): Promise<Desafio>;
  getGetAll(): Promise<Desafio[]>;
  atribuirPartidaDesafio(
    _id: string,
    atribuirDesafiosPartidasDto: AtribuirDesafiosPartidasDto
  ): Promise<void>;
  deleteById(_id: string): Promise<void>;
}
