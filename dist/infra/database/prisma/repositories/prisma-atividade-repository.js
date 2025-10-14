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
exports.PrismaAtividadeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_atividade_mapper_1 = require("../mappers/prisma-atividade-mapper");
let PrismaAtividadeRepository = class PrismaAtividadeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(atividade) {
        const data = prisma_atividade_mapper_1.PrismaAtividadeMapper.toPrisma(atividade);
        await this.prisma.atividade.create({ data });
    }
    async findById(id) {
        const atividade = await this.prisma.atividade.findUnique({
            where: { id },
        });
        if (!atividade) {
            return null;
        }
        return prisma_atividade_mapper_1.PrismaAtividadeMapper.toDomain(atividade);
    }
    async findByClienteId(clienteId) {
        const atividades = await this.prisma.atividade.findMany({
            where: { clienteId },
            orderBy: { data: 'desc' },
        });
        return atividades.map(prisma_atividade_mapper_1.PrismaAtividadeMapper.toDomain);
    }
    async findAll() {
        const atividades = await this.prisma.atividade.findMany({
            orderBy: { data: 'desc' },
        });
        return atividades.map(prisma_atividade_mapper_1.PrismaAtividadeMapper.toDomain);
    }
};
exports.PrismaAtividadeRepository = PrismaAtividadeRepository;
exports.PrismaAtividadeRepository = PrismaAtividadeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAtividadeRepository);
//# sourceMappingURL=prisma-atividade-repository.js.map