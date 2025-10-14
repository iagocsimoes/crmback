import { Estagio } from '@/domain/enterprise/entities/estagio';
import { EstagioRepository } from '../../repositories/estagio-repository';
interface CreateEstagioUseCaseRequest {
    nome: string;
    ordem: number;
    cor?: string;
}
interface CreateEstagioUseCaseResponse {
    estagio: Estagio;
}
export declare class CreateEstagioUseCase {
    private estagioRepository;
    constructor(estagioRepository: EstagioRepository);
    execute(request: CreateEstagioUseCaseRequest): Promise<CreateEstagioUseCaseResponse>;
}
export {};
