import { TarefaRepository } from '../../repositories/tarefa-repository';
interface DeleteTarefaUseCaseRequest {
    tarefaId: string;
}
interface DeleteTarefaUseCaseResponse {
    success: boolean;
}
export declare class DeleteTarefaUseCase {
    private tarefaRepository;
    constructor(tarefaRepository: TarefaRepository);
    execute(request: DeleteTarefaUseCaseRequest): Promise<DeleteTarefaUseCaseResponse>;
}
export {};
