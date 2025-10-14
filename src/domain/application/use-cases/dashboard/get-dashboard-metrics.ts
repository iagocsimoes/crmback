import { Injectable } from '@nestjs/common';
import { ImovelRepository } from '../../repositories/imovel-repository';
import { NegociacaoRepository } from '../../repositories/negociacao-repository';
import { EstagioRepository } from '../../repositories/estagio-repository';

interface DashboardMetrics {
  unidades: {
    total: number;
    vendidas: number;
    percentualVendido: number;
    disponiveis: number;
    percentualDisponivel: number;
    preReserva: number;
    percentualPreReserva: number;
  };
  vgv: {
    total: number;
    vendido: number;
    percentualVendido: number;
    preReserva: number;
    percentualPreReserva: number;
    disponivel: number;
    percentualDisponivel: number;
  };
  pipeline: Array<{
    estagioId: string;
    estagioNome: string;
    ordem: number;
    quantidadeNegociacoes: number;
    valorTotal: number;
  }>;
}

@Injectable()
export class GetDashboardMetricsUseCase {
  constructor(
    private imovelRepository: ImovelRepository,
    private negociacaoRepository: NegociacaoRepository,
    private estagioRepository: EstagioRepository,
  ) {}

  async execute(): Promise<DashboardMetrics> {
    const imoveis = await this.imovelRepository.findAll();
    const estagios = await this.estagioRepository.findAll();

    // Métricas de Unidades
    const totalUnidades = imoveis.length;
    const unidadesVendidas = imoveis.filter((i) => i.status === 'VENDIDO').length;
    const unidadesDisponiveis = imoveis.filter((i) => i.status === 'DISPONIVEL').length;
    const unidadesPreReserva = imoveis.filter((i) => i.status === 'PRE_RESERVA').length;

    // Métricas de VGV
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

    // Pipeline
    const pipeline = await Promise.all(
      estagios.map(async (estagio) => {
        const negociacoes = await this.negociacaoRepository.findByEstagioId(
          estagio.id.toString(),
        );

        const valorTotal = negociacoes.reduce(
          (sum, n) => sum + (n.valor ?? 0),
          0,
        );

        return {
          estagioId: estagio.id.toString(),
          estagioNome: estagio.nome,
          ordem: estagio.ordem,
          quantidadeNegociacoes: negociacoes.length,
          valorTotal,
        };
      }),
    );

    return {
      unidades: {
        total: totalUnidades,
        vendidas: unidadesVendidas,
        percentualVendido:
          totalUnidades > 0 ? (unidadesVendidas / totalUnidades) * 100 : 0,
        disponiveis: unidadesDisponiveis,
        percentualDisponivel:
          totalUnidades > 0 ? (unidadesDisponiveis / totalUnidades) * 100 : 0,
        preReserva: unidadesPreReserva,
        percentualPreReserva:
          totalUnidades > 0 ? (unidadesPreReserva / totalUnidades) * 100 : 0,
      },
      vgv: {
        total: vgvTotal,
        vendido: vgvVendido,
        percentualVendido: vgvTotal > 0 ? (vgvVendido / vgvTotal) * 100 : 0,
        preReserva: vgvPreReserva,
        percentualPreReserva:
          vgvTotal > 0 ? (vgvPreReserva / vgvTotal) * 100 : 0,
        disponivel: vgvDisponivel,
        percentualDisponivel:
          vgvTotal > 0 ? (vgvDisponivel / vgvTotal) * 100 : 0,
      },
      pipeline: pipeline.sort((a, b) => a.ordem - b.ordem),
    };
  }
}
