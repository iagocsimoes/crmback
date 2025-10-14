"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaImovelMapper = void 0;
const imovel_1 = require("../../../../domain/enterprise/entities/imovel");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaImovelMapper {
    static toDomain(raw) {
        return imovel_1.Imovel.create({
            identificacao: raw.identificacao,
            status: raw.status,
            vgv: raw.vgv,
            valor: raw.valor ?? undefined,
            endereco: raw.endereco ?? undefined,
            descricao: raw.descricao ?? undefined,
            tipo: raw.tipo ?? undefined,
            metragem: raw.metragem ?? undefined,
            quartos: raw.quartos ?? undefined,
            vagas: raw.vagas ?? undefined,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(imovel) {
        return {
            id: imovel.id.toString(),
            identificacao: imovel.identificacao,
            status: imovel.status,
            vgv: imovel.vgv,
            valor: imovel.valor ?? null,
            endereco: imovel.endereco ?? null,
            descricao: imovel.descricao ?? null,
            tipo: imovel.tipo ?? null,
            metragem: imovel.metragem ?? null,
            quartos: imovel.quartos ?? null,
            vagas: imovel.vagas ?? null,
            createdAt: imovel.createdAt,
            updatedAt: imovel.updatedAt ?? new Date(),
        };
    }
}
exports.PrismaImovelMapper = PrismaImovelMapper;
//# sourceMappingURL=prisma-imovel-mapper.js.map