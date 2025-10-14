"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaNegociacaoMapper = void 0;
const negociacao_1 = require("../../../../domain/enterprise/entities/negociacao");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaNegociacaoMapper {
    static toDomain(raw) {
        return negociacao_1.Negociacao.create({
            clienteId: new unique_entity_id_1.UniqueEntityID(raw.clienteId),
            imovelId: new unique_entity_id_1.UniqueEntityID(raw.imovelId),
            estagioId: new unique_entity_id_1.UniqueEntityID(raw.estagioId),
            valor: raw.valor ?? undefined,
            formaPagamento: raw.formaPagamento ?? undefined,
            valorEntrada: raw.valorEntrada ?? undefined,
            numeroParcelas: raw.numeroParcelas ?? undefined,
            contratoAssinado: raw.contratoAssinado,
            dataAssinatura: raw.dataAssinatura ?? undefined,
            dataVencimento: raw.dataVencimento ?? undefined,
            observacoes: raw.observacoes ?? undefined,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(negociacao) {
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
            createdAt: negociacao.createdAt,
            updatedAt: negociacao.updatedAt ?? new Date(),
        };
    }
}
exports.PrismaNegociacaoMapper = PrismaNegociacaoMapper;
//# sourceMappingURL=prisma-negociacao-mapper.js.map