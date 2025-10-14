import { Negociacao as PrismaNegociacao } from '@prisma/client';
import { Negociacao } from '@/domain/enterprise/entities/negociacao';
export declare class PrismaNegociacaoMapper {
    static toDomain(raw: PrismaNegociacao): Negociacao;
    static toPrisma(negociacao: Negociacao): PrismaNegociacao;
}
