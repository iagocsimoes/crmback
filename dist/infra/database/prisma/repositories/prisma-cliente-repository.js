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
exports.PrismaClienteRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_cliente_mapper_1 = require("../mappers/prisma-cliente-mapper");
let PrismaClienteRepository = class PrismaClienteRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(cliente) {
        const data = prisma_cliente_mapper_1.PrismaClienteMapper.toPrisma(cliente);
        await this.prisma.cliente.create({ data });
    }
    async findById(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
        });
        if (!cliente) {
            return null;
        }
        return prisma_cliente_mapper_1.PrismaClienteMapper.toDomain(cliente);
    }
    async findAll() {
        const clientes = await this.prisma.cliente.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return clientes.map(prisma_cliente_mapper_1.PrismaClienteMapper.toDomain);
    }
    async save(cliente) {
        const data = prisma_cliente_mapper_1.PrismaClienteMapper.toPrisma(cliente);
        await this.prisma.cliente.update({
            where: { id: cliente.id.toString() },
            data,
        });
    }
    async delete(id) {
        await this.prisma.cliente.delete({
            where: { id },
        });
    }
};
exports.PrismaClienteRepository = PrismaClienteRepository;
exports.PrismaClienteRepository = PrismaClienteRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaClienteRepository);
//# sourceMappingURL=prisma-cliente-repository.js.map