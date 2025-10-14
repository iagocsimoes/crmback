import { Tarefa, PrioridadeTarefa } from '@/domain/enterprise/entities/tarefa';
import { TarefaRepository } from '../../repositories/tarefa-repository';
interface UpdateTarefaUseCaseRequest {
    tarefaId: string;
    titulo?: string;
    descricao?: string;
    prioridade?: PrioridadeTarefa;
    dataVencimento?: Date;
}
interface UpdateTarefaUseCaseResponse {
    tarefa: Tarefa;
}
export declare class UpdateTarefaUseCase {
    private tarefaRepository;
    constructor(tarefaRepository: TarefaRepository);
    execute(request: UpdateTarefaUseCaseRequest): Promise<UpdateTarefaUseCaseResponse>;
}
export {};
