"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEstagioMapper = void 0;
const estagio_1 = require("../../../../domain/enterprise/entities/estagio");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaEstagioMapper {
    static toDomain(raw) {
        return estagio_1.Estagio.create({
            nome: raw.nome,
            ordem: raw.ordem,
            cor: raw.cor ?? undefined,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(estagio) {
        return {
            id: estagio.id.toString(),
            nome: estagio.nome,
            ordem: estagio.ordem,
            cor: estagio.cor ?? null,
            createdAt: estagio.createdAt,
            updatedAt: estagio.updatedAt ?? new Date(),
        };
    }
}
exports.PrismaEstagioMapper = PrismaEstagioMapper;
//# sourceMappingURL=prisma-estagio-mapper.js.map