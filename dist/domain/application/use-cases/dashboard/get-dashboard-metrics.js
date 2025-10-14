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
exports.GetDashboardMetricsUseCase = void 0;
const common_1 = require("@nestjs/common");
const imovel_repository_1 = require("../../repositories/imovel-repository");
const negociacao_repository_1 = require("../../repositories/negociacao-repository");
const estagio_repository_1 = require("../../repositories/estagio-repository");
let GetDashboardMetricsUseCase = class GetDashboardMetricsUseCase {
    imovelRepository;
    negociacaoRepository;
    estagioRepository;
    constructor(imovelRepository, negociacaoRepository, estagioRepository) {
        this.imovelRepository = imovelRepository;
        this.negociacaoRepository = negociacaoRepository;
        this.estagioRepository = estagioRepository;
    }
    async execute() {
        const imoveis = await this.imovelRepository.findAll();
        const estagios = await this.estagioRepository.findAll();
        const totalUnidades = imoveis.length;
        const unidadesVendidas = imoveis.filter((i) => i.status === 'VENDIDO').length;
        const unidadesDisponiveis = imoveis.filter((i) => i.status === 'DISPONIVEL').length;
        const unidadesPreReserva = imoveis.filter((i) => i.status === 'PRE_RESERVA').length;
        const vgvTotal = imoveis.reduce((sum, i) => sum + i.vgv, 0);
        const vgvVendido = imoveis
            .filter((i) => i.status === 'VENDIDO')
            .reduce((sum, i) => sum + i.vgv, 0);
        const vgvPreReserva = imoveis
            .filter((i) => i.status === 'PRE_RESERVA')
            .reduce((sum, i) => sum + i.vgv, 0);
        const vgvDisponivel = imoveis
            .filter((i) => i.status === 'DISPONIVEL')
            .reduce((sum, i) => sum + i.vgv, 0);
        const pipeline = await Promise.all(estagios.map(async (estagio) => {
            const negociacoes = await this.negociacaoRepository.findByEstagioId(estagio.id.toString());
            const valorTotal = negociacoes.reduce((sum, n) => sum + (n.valor ?? 0), 0);
            return {
                estagioId: estagio.id.toString(),
                estagioNome: estagio.nome,
                ordem: estagio.ordem,
                quantidadeNegociacoes: negociacoes.length,
                valorTotal,
            };
        }));
        return {
            unidades: {
                total: totalUnidades,
                vendidas: unidadesVendidas,
                percentualVendido: totalUnidades > 0 ? (unidadesVendidas / totalUnidades) * 100 : 0,
                disponiveis: unidadesDisponiveis,
                percentualDisponivel: totalUnidades > 0 ? (unidadesDisponiveis / totalUnidades) * 100 : 0,
                preReserva: unidadesPreReserva,
                percentualPreReserva: totalUnidades > 0 ? (unidadesPreReserva / totalUnidades) * 100 : 0,
            },
            vgv: {
                total: vgvTotal,
                vendido: vgvVendido,
                percentualVendido: vgvTotal > 0 ? (vgvVendido / vgvTotal) * 100 : 0,
                preReserva: vgvPreReserva,
                percentualPreReserva: vgvTotal > 0 ? (vgvPreReserva / vgvTotal) * 100 : 0,
                disponivel: vgvDisponivel,
                percentualDisponivel: vgvTotal > 0 ? (vgvDisponivel / vgvTotal) * 100 : 0,
            },
            pipeline: pipeline.sort((a, b) => a.ordem - b.ordem),
        };
    }
};
exports.GetDashboardMetricsUseCase = GetDashboardMetricsUseCase;
exports.GetDashboardMetricsUseCase = GetDashboardMetricsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [imovel_repository_1.ImovelRepository,
        negociacao_repository_1.NegociacaoRepository,
        estagio_repository_1.EstagioRepository])
], GetDashboardMetricsUseCase);
//# sourceMappingURL=get-dashboard-metrics.js.map