"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEstagioRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_estagio_mapper_1 = require("../mappers/prisma-estagio-mapper");
let PrismaEstagioRepository = class PrismaEstagioRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(estagio) {
        const data = prisma_estagio_mapper_1.PrismaEstagioMapper.toPrisma(estagio);
        await this.prisma.estagio.create({ data });
    }
    async findById(id) {
        const estagio = await this.prisma.estagio.findUnique({
            where: { id },
        });
        if (!estagio) {
            return null;
        }
        return prisma_estagio_mapper_1.PrismaEstagioMapper.toDomain(estagio);
    }
    async findAll() {
        const estagios = await this.prisma.estagio.findMany({
            orderBy: { ordem: 'asc' },
        });
        return estagios.map(prisma_estagio_mapper_1.PrismaEstagioMapper.toDomain);
    }
    async findByNome(nome) {
        const estagio = await this.prisma.estagio.findUnique({
            where: { nome },
        });
        if (!estagio) {
            return null;
        }
        return prisma_estagio_mapper_1.PrismaEstagioMapper.toDomain(estagio);
    }
    async save(estagio) {
        const data = prisma_estagio_mapper_1.PrismaEstagioMapper.toPrisma(estagio);
        await this.prisma.estagio.update({
            where: { id: estagio.id.toString() },
            data,
        });
    }
    async delete(id) {
        await this.prisma.estagio.delete({
            where: { id },
        });
    }
};
exports.PrismaEstagioRepository = PrismaEstagioRepository;
exports.PrismaEstagioRepository = PrismaEstagioRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEstagioRepository);
//# sourceMappingURL=prisma-estagio-repository.js.map