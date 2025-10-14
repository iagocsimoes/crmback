import { Tarefa } from '@/domain/enterprise/entities/tarefa';
import { TarefaRepository } from '../../repositories/tarefa-repository';
interface ListTarefasUseCaseRequest {
    usuarioId?: string;
    clienteId?: string;
}
interface ListTarefasUseCaseResponse {
    tarefas: Tarefa[];
}
export declare class ListTarefasUseCase {
    private tarefaRepository;
    constructor(tarefaRepository: TarefaRepository);
    execute(request: ListTarefasUseCaseRequest): Promise<ListTarefasUseCaseResponse>;
}
export {};
