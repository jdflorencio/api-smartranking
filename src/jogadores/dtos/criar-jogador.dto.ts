export class CriarJogadorDto {
  /**
   * O phoneNumber é o telefone utilizado exibir o telefone de contato do jogador.
   * @example 73991311901
   */
  readonly phoneNumber: string;
  /**
   * O email é utilizado exibir para exibir o email de contato do jogador.
   * @example email@exemple.com
   */
  readonly email: string;
  /**
   * O name é o utilizado exibir o name de contato do jogador.
   * @example Fulano de tal
   */
  readonly name: string;
}
