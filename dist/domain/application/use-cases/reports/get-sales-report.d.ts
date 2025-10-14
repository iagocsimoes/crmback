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
        conversao: number;
        ticketMedio: number;
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
    };
}
export declare class GetSalesReportUseCase {
    private negociacaoRepository;
    private imovelRepository;
    private estagioRepository;
    constructor(negociacaoRepository: NegociacaoRepository, imovelRepository: ImovelRepository, estagioRepository: EstagioRepository);
    execute(filters: SalesReportFilters): Promise<SalesReportResponse>;
}
export {};
