import {
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Jogador } from '../../jogadores/interfaces/jogador.interface';
export class AtualizarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;
  
}
