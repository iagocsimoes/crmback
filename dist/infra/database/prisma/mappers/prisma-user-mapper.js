"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserMapper = void 0;
const user_1 = require("../../../../domain/enterprise/entities/user");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaUserMapper {
    static toDomain(raw) {
        return user_1.User.create({
            nome: raw.nome,
            email: raw.email,
            senha: raw.senha,
            role: raw.role,
            ativo: raw.ativo,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(user) {
        return {
            id: user.id.toString(),
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            role: user.role,
            ativo: user.ativo,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt ?? new Date(),
        };
    }
}
exports.PrismaUserMapper = PrismaUserMapper;
//# sourceMappingURL=prisma-user-mapper.js.map