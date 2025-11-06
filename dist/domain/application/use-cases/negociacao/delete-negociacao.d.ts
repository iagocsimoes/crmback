import { NegociacaoRepository } from '../../repositories/negociacao-repository';
interface DeleteNegociacaoUseCaseRequest {
    negociacaoId: string;
}
interface DeleteNegociacaoUseCaseResponse {
    success: boolean;
}
export declare class DeleteNegociacaoUseCase {
    private negociacaoRepository;
    constructor(negociacaoRepository: NegociacaoRepository);
    execute(request: DeleteNegociacaoUseCaseRequest): Promise<DeleteNegociacaoUseCaseResponse>;
}
export {};
