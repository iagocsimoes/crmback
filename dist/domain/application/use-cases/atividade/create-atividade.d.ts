import { Atividade, TipoAtividade } from '@/domain/enterprise/entities/atividade';
import { AtividadeRepository } from '../../repositories/atividade-repository';
interface CreateAtividadeUseCaseRequest {
    clienteId: string;
    usuarioId: string;
    tipo: TipoAtividade;
    descricao: string;
    data: Date;
    duracao?: number;
    observacoes?: string;
}
interface CreateAtividadeUseCaseResponse {
    atividade: Atividade;
}
export declare class CreateAtividadeUseCase {
    private atividadeRepository;
    constructor(atividadeRepository: AtividadeRepository);
    execute(request: CreateAtividadeUseCaseRequest): Promise<CreateAtividadeUseCaseResponse>;
}
export {};
