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
exports.PrismaTarefaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_tarefa_mapper_1 = require("../mappers/prisma-tarefa-mapper");
let PrismaTarefaRepository = class PrismaTarefaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tarefa) {
        const data = prisma_tarefa_mapper_1.PrismaTarefaMapper.toPrisma(tarefa);
        await this.prisma.tarefa.create({ data });
    }
    async findById(id) {
        const tarefa = await this.prisma.tarefa.findUnique({
            where: { id },
        });
        if (!tarefa) {
            return null;
        }
        return prisma_tarefa_mapper_1.PrismaTarefaMapper.toDomain(tarefa);
    }
    async findByUsuarioId(usuarioId) {
        const tarefas = await this.prisma.tarefa.findMany({
            where: { usuarioId },
            orderBy: { dataVencimento: 'asc' },
        });
        return tarefas.map(prisma_tarefa_mapper_1.PrismaTarefaMapper.toDomain);
    }
    async findByClienteId(clienteId) {
        const tarefas = await this.prisma.tarefa.findMany({
            where: { clienteId },
            orderBy: { dataVencimento: 'asc' },
        });
        return tarefas.map(prisma_tarefa_mapper_1.PrismaTarefaMapper.toDomain);
    }
    async findAll() {
        const tarefas = await this.prisma.tarefa.findMany({
            orderBy: { dataVencimento: 'asc' },
        });
        return tarefas.map(prisma_tarefa_mapper_1.PrismaTarefaMapper.toDomain);
    }
    async save(tarefa) {
        const data = prisma_tarefa_mapper_1.PrismaTarefaMapper.toPrisma(tarefa);
        await this.prisma.tarefa.update({
            where: { id: tarefa.id.toString() },
            data,
        });
    }
    async delete(id) {
        await this.prisma.tarefa.delete({
            where: { id },
        });
    }
};
exports.PrismaTarefaRepository = PrismaTarefaRepository;
exports.PrismaTarefaRepository = PrismaTarefaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTarefaRepository);
//# sourceMappingURL=prisma-tarefa-repository.js.map