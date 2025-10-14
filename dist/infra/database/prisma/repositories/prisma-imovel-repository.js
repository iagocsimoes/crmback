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
exports.PrismaImovelRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_imovel_mapper_1 = require("../mappers/prisma-imovel-mapper");
let PrismaImovelRepository = class PrismaImovelRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(imovel) {
        const data = prisma_imovel_mapper_1.PrismaImovelMapper.toPrisma(imovel);
        await this.prisma.imovel.create({ data });
    }
    async findById(id) {
        const imovel = await this.prisma.imovel.findUnique({
            where: { id },
        });
        if (!imovel) {
            return null;
        }
        return prisma_imovel_mapper_1.PrismaImovelMapper.toDomain(imovel);
    }
    async findAll() {
        const imoveis = await this.prisma.imovel.findMany({
            orderBy: { identificacao: 'asc' },
        });
        return imoveis.map(prisma_imovel_mapper_1.PrismaImovelMapper.toDomain);
    }
    async findByStatus(status) {
        const imoveis = await this.prisma.imovel.findMany({
            where: { status },
            orderBy: { identificacao: 'asc' },
        });
        return imoveis.map(prisma_imovel_mapper_1.PrismaImovelMapper.toDomain);
    }
    async save(imovel) {
        const data = prisma_imovel_mapper_1.PrismaImovelMapper.toPrisma(imovel);
        await this.prisma.imovel.update({
            where: { id: imovel.id.toString() },
            data,
        });
    }
    async delete(id) {
        await this.prisma.imovel.delete({
            where: { id },
        });
    }
};
exports.PrismaImovelRepository = PrismaImovelRepository;
exports.PrismaImovelRepository = PrismaImovelRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaImovelRepository);
//# sourceMappingURL=prisma-imovel-repository.js.map