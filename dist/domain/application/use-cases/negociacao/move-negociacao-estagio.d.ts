import { NegociacaoRepository } from '../../repositories/negociacao-repository';
import { ImovelRepository } from '../../repositories/imovel-repository';
import { EstagioRepository } from '../../repositories/estagio-repository';
interface MoveNegociacaoEstagioUseCaseRequest {
    negociacaoId: string;
    novoEstagioId: string;
}
interface MoveNegociacaoEstagioUseCaseResponse {
    success: boolean;
}
export declare class MoveNegociacaoEstagioUseCase {
    private negociacaoRepository;
    private imovelRepository;
    private estagioRepository;
    constructor(negociacaoRepository: NegociacaoRepository, imovelRepository: ImovelRepository, estagioRepository: EstagioRepository);
    execute(request: MoveNegociacaoEstagioUseCaseRequest): Promise<MoveNegociacaoEstagioUseCaseResponse>;
}
export {};
