import { Injectable } from '@nestjs/common';
import { NegociacaoRepository } from '../../repositories/negociacao-repository';
import { ImovelRepository } from '../../repositories/imovel-repository';
import { EstagioRepository } from '../../repositories/estagio-repository';

interface SalesReportFilters {
  startDate?: Date;
  endDate?: Date;
  estagioId?: string;
}

export interface SalesReportResponse {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  totais: {
    negociacoes: number;
    negociacoesGanhas: number;
    negociacoesPerdidas: number;
    valorTotal: number;
    valorGanho: number;
    valorPerdido: number;
  };
  taxas: {
    conversao: number; // % de negociações ganhas
    ticketMedio: number; // valor médio por negociação ganha
  };
  porEstagio: Array<{
    estagioId: string;
    estagioNome: string;
    quantidade: number;
    valorTotal: number;
    percentual: number;
  }>;
  tempoMedioFunil: {
    dias: number;
    // Tempo médio desde criação até ganho/perda
  };
}

@Injectable()
export class GetSalesReportUseCase {
  constructor(
    private negociacaoRepository: NegociacaoRepository,
    private imovelRepository: ImovelRepository,
    private estagioRepository: EstagioRepository,
  ) {}

  async execute(filters: SalesReportFilters): Promise<SalesReportResponse> {
    const startDate = filters.startDate || new Date(new Date().getFullYear(), 0, 1); // Início do ano
    const endDate = filters.endDate || new Date(); // Hoje

    // Buscar todos os estágios
    const estagios = await this.estagioRepository.findAll();
    const estagioGanho = estagios.find((e) => e.nome.toUpperCase() === 'GANHO');
    const estagioPerdido = estagios.find((e) => e.nome.toUpperCase() === 'PERDIDO');

    // Buscar todas as negociações
    const todasNegociacoes = await this.negociacaoRepository.findAll();

    // Filtrar por período
    const negociacoesPeriodo = todasNegociacoes.filter((n) => {
      const createdAt = new Date(n.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });

    // Filtrar por estágio se fornecido
    const negociacoes = filters.estagioId
      ? negociacoesPeriodo.filter((n) => n.estagioId.toString() === filters.estagioId)
      : negociacoesPeriodo;

    // Negociações ganhas e perdidas
    const negociacoesGanhas = negociacoes.filter(
      (n) => estagioGanho && n.estagioId.toString() === estagioGanho.id.toString(),
    );
    const negociacoesPerdidas = negociacoes.filter(
      (n) => estagioPerdido && n.estagioId.toString() === estagioPerdido.id.toString(),
    );

    // Valores totais
    const valorTotal = negociacoes.reduce((sum, n) => sum + (n.valor || 0), 0);
    const valorGanho = negociacoesGanhas.reduce((sum, n) => sum + (n.valor || 0), 0);
    const valorPerdido = negociacoesPerdidas.reduce((sum, n) => sum + (n.valor || 0), 0);

    // Taxa de conversão
    const taxaConversao =
      negociacoes.length > 0 ? (negociacoesGanhas.length / negociacoes.length) * 100 : 0;

    // Ticket médio
    const ticketMedio =
      negociacoesGanhas.length > 0 ? valorGanho / negociacoesGanhas.length : 0;

    // Por estágio
    const porEstagio = await Promise.all(
      estagios.map(async (estagio) => {
        const negociacoesEstagio = negociacoes.filter(
          (n) => n.estagioId.toString() === estagio.id.toString(),
        );
        const valorTotalEstagio = negociacoesEstagio.reduce(
          (sum, n) => sum + (n.valor || 0),
          0,
        );

        return {
          estagioId: estagio.id.toString(),
          estagioNome: estagio.nome,
          quantidade: negociacoesEstagio.length,
          valorTotal: valorTotalEstagio,
          percentual:
            negociacoes.length > 0 ? (negociacoesEstagio.length / negociacoes.length) * 100 : 0,
        };
      }),
    );

    // Tempo médio no funil (simplificado - da criação até hoje ou fechamento)
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
}
