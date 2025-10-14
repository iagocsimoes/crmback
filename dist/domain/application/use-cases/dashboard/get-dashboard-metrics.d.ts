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
export declare class GetDashboardMetricsUseCase {
    private imovelRepository;
    private negociacaoRepository;
    private estagioRepository;
    constructor(imovelRepository: ImovelRepository, negociacaoRepository: NegociacaoRepository, estagioRepository: EstagioRepository);
    execute(): Promise<DashboardMetrics>;
}
export {};
