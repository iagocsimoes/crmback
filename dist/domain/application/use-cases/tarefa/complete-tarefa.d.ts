import { Tarefa } from '@/domain/enterprise/entities/tarefa';
import { TarefaRepository } from '../../repositories/tarefa-repository';
interface CompleteTarefaUseCaseRequest {
    tarefaId: string;
}
interface CompleteTarefaUseCaseResponse {
    tarefa: Tarefa;
}
export declare class CompleteTarefaUseCase {
    private tarefaRepository;
    constructor(tarefaRepository: TarefaRepository);
    execute(request: CompleteTarefaUseCaseRequest): Promise<CompleteTarefaUseCaseResponse>;
}
export {};
