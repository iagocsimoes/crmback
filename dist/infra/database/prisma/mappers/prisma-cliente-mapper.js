"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClienteMapper = void 0;
const cliente_1 = require("../../../../domain/enterprise/entities/cliente");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaClienteMapper {
    static toDomain(raw) {
        return cliente_1.Cliente.create({
            nome: raw.nome,
            telefone: raw.telefone,
            email: raw.email ?? undefined,
            endereco: raw.endereco ?? undefined,
            formaPagamento: raw.formaPagamento,
            origemLead: raw.origemLead ?? undefined,
            cpfCnpj: raw.cpfCnpj ?? undefined,
            observacoes: raw.observacoes ?? undefined,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(cliente) {
        return {
            id: cliente.id.toString(),
            nome: cliente.nome,
            telefone: cliente.telefone,
            email: cliente.email ?? null,
            endereco: cliente.endereco ?? null,
            formaPagamento: cliente.formaPagamento ?? null,
            origemLead: cliente.origemLead ?? null,
            cpfCnpj: cliente.cpfCnpj ?? null,
            observacoes: cliente.observacoes ?? null,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt ?? new Date(),
        };
    }
}
exports.PrismaClienteMapper = PrismaClienteMapper;
//# sourceMappingURL=prisma-cliente-mapper.js.map