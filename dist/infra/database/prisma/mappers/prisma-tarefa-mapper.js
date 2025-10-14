"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTarefaMapper = void 0;
const tarefa_1 = require("../../../../domain/enterprise/entities/tarefa");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaTarefaMapper {
    static toDomain(raw) {
        return tarefa_1.Tarefa.create({
            titulo: raw.titulo,
            descricao: raw.descricao ?? undefined,
            status: raw.status,
            prioridade: raw.prioridade,
            dataVencimento: raw.dataVencimento,
            clienteId: raw.clienteId
                ? new unique_entity_id_1.UniqueEntityID(raw.clienteId)
                : undefined,
            usuarioId: new unique_entity_id_1.UniqueEntityID(raw.usuarioId),
            dataConclusao: raw.dataConclusao ?? undefined,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt ?? undefined,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(tarefa) {
        return {
            id: tarefa.id.toString(),
            titulo: tarefa.titulo,
            descricao: tarefa.descricao ?? null,
            status: tarefa.status,
            prioridade: tarefa.prioridade,
            dataVencimento: tarefa.dataVencimento,
            clienteId: tarefa.clienteId?.toString() ?? null,
            usuarioId: tarefa.usuarioId.toString(),
            dataConclusao: tarefa.dataConclusao ?? null,
            createdAt: tarefa.createdAt,
            updatedAt: tarefa.updatedAt ?? null,
        };
    }
}
exports.PrismaTarefaMapper = PrismaTarefaMapper;
//# sourceMappingURL=prisma-tarefa-mapper.js.map