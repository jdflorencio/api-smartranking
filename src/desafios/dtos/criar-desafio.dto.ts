import {
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";
import { CriarJogadorDto } from "src/jogadores/dtos/criar-jogador.dto";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { ApiProperty } from "@nestjs/swagger";
export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;
  @IsNotEmpty()
  @ApiProperty({ type: CriarJogadorDto })
  solicitante: Jogador;
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty({ type: Array<CriarJogadorDto> })
  jogadores: Array<Jogador>;
}
