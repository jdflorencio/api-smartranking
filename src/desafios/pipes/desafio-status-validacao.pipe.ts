import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { DesafiosStatus } from "../interfaces/desafio-status.enum";

export class DesafioStatusValidacaoPipe implements PipeTransform {
  readonly statusPermitidos = [
    DesafiosStatus.ACEITO,
    DesafiosStatus.NEGADO,
    DesafiosStatus.CANCELADO,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    console.log({ value: value.status });

    if (!this.ehStatusValido(status)) {
      throw new BadRequestException(`${status} é um status invalido`);
    }
    return value;
  }

  private ehStatusValido(status: any) {
    const idx = this.statusPermitidos.indexOf(status);

    return idx !== -1;
  }
}
