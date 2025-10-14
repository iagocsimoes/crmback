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
exports.GetSalesReportUseCase = void 0;
const common_1 = require("@nestjs/common");
const negociacao_repository_1 = require("../../repositories/negociacao-repository");
const imovel_repository_1 = require("../../repositories/imovel-repository");
const estagio_repository_1 = require("../../repositories/estagio-repository");
let GetSalesReportUseCase = class GetSalesReportUseCase {
    negociacaoRepository;
    imovelRepository;
    estagioRepository;
    constructor(negociacaoRepository, imovelRepository, estagioRepository) {
        this.negociacaoRepository = negociacaoRepository;
        this.imovelRepository = imovelRepository;
        this.estagioRepository = estagioRepository;
    }
    async execute(filters) {
        const startDate = filters.startDate || new Date(new Date().getFullYear(), 0, 1);
        const endDate = filters.endDate || new Date();
        const estagios = await this.estagioRepository.findAll();
        const estagioGanho = estagios.find((e) => e.nome.toUpperCase() === 'GANHO');
        const estagioPerdido = estagios.find((e) => e.nome.toUpperCase() === 'PERDIDO');
        const todasNegociacoes = await this.negociacaoRepository.findAll();
        const negociacoesPeriodo = todasNegociacoes.filter((n) => {
            const createdAt = new Date(n.createdAt);
            return createdAt >= startDate && createdAt <= endDate;
        });
        const negociacoes = filters.estagioId
            ? negociacoesPeriodo.filter((n) => n.estagioId.toString() === filters.estagioId)
            : negociacoesPeriodo;
        const negociacoesGanhas = negociacoes.filter((n) => estagioGanho && n.estagioId.toString() === estagioGanho.id.toString());
        const negociacoesPerdidas = negociacoes.filter((n) => estagioPerdido && n.estagioId.toString() === estagioPerdido.id.toString());
        const valorTotal = negociacoes.reduce((sum, n) => sum + (n.valor || 0), 0);
        const valorGanho = negociacoesGanhas.reduce((sum, n) => sum + (n.valor || 0), 0);
        const valorPerdido = negociacoesPerdidas.reduce((sum, n) => sum + (n.valor || 0), 0);
        const taxaConversao = negociacoes.length > 0 ? (negociacoesGanhas.length / negociacoes.length) * 100 : 0;
        const ticketMedio = negociacoesGanhas.length > 0 ? valorGanho / negociacoesGanhas.length : 0;
        const porEstagio = await Promise.all(estagios.map(async (estagio) => {
            const negociacoesEstagio = negociacoes.filter((n) => n.estagioId.toString() === estagio.id.toString());
            const valorTotalEstagio = negociacoesEstagio.reduce((sum, n) => sum + (n.valor || 0), 0);
            return {
                estagioId: estagio.id.toString(),
                estagioNome: estagio.nome,
                quantidade: negociacoesEstagio.length,
                valorTotal: valorTotalEstagio,
                percentual: negociacoes.length > 0 ? (negociacoesEstagio.length / negociacoes.length) * 100 : 0,
            };
        }));
        const negociacoesFinalizadas = [...negociacoesGanhas, ...negociacoesPerdidas];
        let tempoMedioDias = 0;
        if (negociacoesFinalizadas.length > 0) {
            const somaDias = negociacoesFinalizadas.reduce((sum, n) => {
                const inicio = new Date(n.createdAt);
                const fim = n.updatedAt ? new Date(n.updatedAt) : new Date();
                const diffTime = Math.abs(fim.getTime() - inicio.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return sum + diffDays;
            }, 0);
            tempoMedioDias = Math.round(somaDias / negociacoesFinalizadas.length);
        }
        return {
            periodo: {
                inicio: startDate,
                fim: endDate,
            },
            totais: {
                negociacoes: negociacoes.length,
                negociacoesGanhas: negociacoesGanhas.length,
                negociacoesPerdidas: negociacoesPerdidas.length,
                valorTotal,
                valorGanho,
                valorPerdido,
            },
            taxas: {
                conversao: Number(taxaConversao.toFixed(2)),
                ticketMedio: Number(ticketMedio.toFixed(2)),
            },
            porEstagio: porEstagio.sort((a, b) => b.quantidade - a.quantidade),
            tempoMedioFunil: {
                dias: tempoMedioDias,
            },
        };
    }
};
exports.GetSalesReportUseCase = GetSalesReportUseCase;
exports.GetSalesReportUseCase = GetSalesReportUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [negociacao_repository_1.NegociacaoRepository,
        imovel_repository_1.ImovelRepository,
        estagio_repository_1.EstagioRepository])
], GetSalesReportUseCase);
//# sourceMappingURL=get-sales-report.js.map