import { Tarefa, PrioridadeTarefa } from '@/domain/enterprise/entities/tarefa';
import { TarefaRepository } from '../../repositories/tarefa-repository';
interface CreateTarefaUseCaseRequest {
    titulo: string;
    descricao?: string;
    prioridade: PrioridadeTarefa;
    dataVencimento: Date;
    clienteId?: string;
    usuarioId: string;
}
interface CreateTarefaUseCaseResponse {
    tarefa: Tarefa;
}
export declare class CreateTarefaUseCase {
    private tarefaRepository;
    constructor(tarefaRepository: TarefaRepository);
    execute(request: CreateTarefaUseCaseRequest): Promise<CreateTarefaUseCaseResponse>;
}
export {};
