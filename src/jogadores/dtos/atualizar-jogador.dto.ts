import { IsNotEmpty } from 'class-validator';

export class AtualizarJogadorDto {
  /**
   * O phoneNumber é o telefone utilizado exibir o telefone de contato do jogador.
   * @example 73991311901
   */
  @IsNotEmpty()
  readonly phoneNumber: string;

  /**
   * O name é o utilizado exibir o name de contato do jogador.
   * @example Fulano de tal
   */
  @IsNotEmpty()
  readonly name: string;
}
