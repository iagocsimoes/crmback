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
exports.PrismaNegociacaoRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_negociacao_mapper_1 = require("../mappers/prisma-negociacao-mapper");
let PrismaNegociacaoRepository = class PrismaNegociacaoRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(negociacao) {
        const data = prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toPrisma(negociacao);
        await this.prisma.negociacao.create({ data });
    }
    async findById(id) {
        const negociacao = await this.prisma.negociacao.findUnique({
            where: { id },
        });
        if (!negociacao) {
            return null;
        }
        return prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toDomain(negociacao);
    }
    async findAll() {
        const negociacoes = await this.prisma.negociacao.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return negociacoes.map(prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toDomain);
    }
    async findByClienteId(clienteId) {
        const negociacoes = await this.prisma.negociacao.findMany({
            where: { clienteId },
            orderBy: { createdAt: 'desc' },
        });
        return negociacoes.map(prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toDomain);
    }
    async findByImovelId(imovelId) {
        const negociacoes = await this.prisma.negociacao.findMany({
            where: { imovelId },
            orderBy: { createdAt: 'desc' },
        });
        return negociacoes.map(prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toDomain);
    }
    async findByEstagioId(estagioId) {
        const negociacoes = await this.prisma.negociacao.findMany({
            where: { estagioId },
            orderBy: { createdAt: 'desc' },
        });
        return negociacoes.map(prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toDomain);
    }
    async findAllComDetalhes() {
        const negociacoes = await this.prisma.negociacao.findMany({
            include: {
                cliente: true,
                imovel: true,
                estagio: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return negociacoes.map((n) => ({
            negociacao: prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toDomain(n),
            clienteNome: n.cliente.nome,
            clienteEmail: n.cliente.email,
            clienteTelefone: n.cliente.telefone,
            clienteCpfCnpj: n.cliente.cpfCnpj,
            imovelIdentificacao: n.imovel.identificacao,
            imovelTipo: n.imovel.tipo,
            imovelEndereco: n.imovel.endereco,
            imovelValor: n.imovel.valor,
            imovelMetragem: n.imovel.metragem,
            imovelQuartos: n.imovel.quartos,
            imovelVagas: n.imovel.vagas,
            estagioNome: n.estagio.nome,
        }));
    }
    async save(negociacao) {
        const data = prisma_negociacao_mapper_1.PrismaNegociacaoMapper.toPrisma(negociacao);
        await this.prisma.negociacao.update({
            where: { id: negociacao.id.toString() },
            data,
        });
    }
    async delete(id) {
        await this.prisma.negociacao.delete({
            where: { id },
        });
    }
};
exports.PrismaNegociacaoRepository = PrismaNegociacaoRepository;
exports.PrismaNegociacaoRepository = PrismaNegociacaoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaNegociacaoRepository);
//# sourceMappingURL=prisma-negociacao-repository.js.map