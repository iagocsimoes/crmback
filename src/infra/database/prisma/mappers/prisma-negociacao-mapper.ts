import { Negociacao as PrismaNegociacao } from '@prisma/client';
import { Negociacao } from '@/domain/enterprise/entities/negociacao';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaNegociacaoMapper {
  static toDomain(raw: PrismaNegociacao): Negociacao {
    return Negociacao.create(
      {
        clienteId: new UniqueEntityID(raw.clienteId),
        imovelId: new UniqueEntityID(raw.imovelId),
        estagioId: new UniqueEntityID(raw.estagioId),
        valor: raw.valor ?? undefined,
        formaPagamento: raw.formaPagamento ?? undefined,
        valorEntrada: raw.valorEntrada ?? undefined,
        numeroParcelas: raw.numeroParcelas ?? undefined,
        contratoAssinado: raw.contratoAssinado,
        dataAssinatura: raw.dataAssinatura ?? undefined,
        dataVencimento: raw.dataVencimento ?? undefined,
        observacoes: raw.observacoes ?? undefined,
        canalVenda: raw.canalVenda ?? undefined,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(negociacao: Negociacao): PrismaNegociacao {
    return {
      id: negociacao.id.toString(),
      clienteId: negociacao.clienteId.toString(),
      imovelId: negociacao.imovelId.toString(),
      estagioId: negociacao.estagioId.toString(),
      valor: negociacao.valor ?? null,
      formaPagamento: negociacao.formaPagamento ?? null,
      valorEntrada: negociacao.valorEntrada ?? null,
      numeroParcelas: negociacao.numeroParcelas ?? null,
      contratoAssinado: negociacao.contratoAssinado,
      dataAssinatura: negociacao.dataAssinatura ? new Date(negociacao.dataAssinatura) : null,
      dataVencimento: negociacao.dataVencimento ? new Date(negociacao.dataVencimento) : null,
      observacoes: negociacao.observacoes ?? null,
      canalVenda: negociacao.canalVenda ?? null,
      createdAt: negociacao.createdAt,
      updatedAt: negociacao.updatedAt ?? new Date(),
    };
  }
}
