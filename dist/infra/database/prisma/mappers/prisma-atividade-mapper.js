"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAtividadeMapper = void 0;
const atividade_1 = require("../../../../domain/enterprise/entities/atividade");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaAtividadeMapper {
    static toDomain(raw) {
        return atividade_1.Atividade.create({
            clienteId: new unique_entity_id_1.UniqueEntityID(raw.clienteId),
            usuarioId: new unique_entity_id_1.UniqueEntityID(raw.usuarioId),
            tipo: raw.tipo,
            descricao: raw.descricao,
            data: raw.data,
            duracao: raw.duracao ?? undefined,
            observacoes: raw.observacoes ?? undefined,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt ?? undefined,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(atividade) {
        return {
            id: atividade.id.toString(),
            clienteId: atividade.clienteId.toString(),
            usuarioId: atividade.usuarioId.toString(),
            tipo: atividade.tipo,
            descricao: atividade.descricao,
            data: atividade.data,
            duracao: atividade.duracao ?? null,
            observacoes: atividade.observacoes ?? null,
            createdAt: atividade.createdAt,
            updatedAt: atividade.updatedAt ?? null,
        };
    }
}
exports.PrismaAtividadeMapper = PrismaAtividadeMapper;
//# sourceMappingURL=prisma-atividade-mapper.js.map