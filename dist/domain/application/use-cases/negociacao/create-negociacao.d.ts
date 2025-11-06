import { Negociacao } from '@/domain/enterprise/entities/negociacao';
import { NegociacaoRepository } from '../../repositories/negociacao-repository';
import { ImovelRepository } from '../../repositories/imovel-repository';
interface CreateNegociacaoUseCaseRequest {
    clienteId: string;
    imovelId: string;
    estagioId: string;
    valor?: number;
    observacoes?: string;
    canalVenda?: string;
}
interface CreateNegociacaoUseCaseResponse {
    negociacao: Negociacao;
}
export declare class CreateNegociacaoUseCase {
    private negociacaoRepository;
    private imovelRepository;
    constructor(negociacaoRepository: NegociacaoRepository, imovelRepository: ImovelRepository);
    execute(request: CreateNegociacaoUseCaseRequest): Promise<CreateNegociacaoUseCaseResponse>;
}
export {};
