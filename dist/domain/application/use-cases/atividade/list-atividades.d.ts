import { Atividade } from '@/domain/enterprise/entities/atividade';
import { AtividadeRepository } from '../../repositories/atividade-repository';
interface ListAtividadesUseCaseRequest {
    clienteId?: string;
}
interface ListAtividadesUseCaseResponse {
    atividades: Atividade[];
}
export declare class ListAtividadesUseCase {
    private atividadeRepository;
    constructor(atividadeRepository: AtividadeRepository);
    execute(request: ListAtividadesUseCaseRequest): Promise<ListAtividadesUseCaseResponse>;
}
export {};
