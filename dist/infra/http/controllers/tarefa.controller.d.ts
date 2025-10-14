import { CreateTarefaUseCase } from '@/domain/application/use-cases/tarefa/create-tarefa';
import { ListTarefasUseCase } from '@/domain/application/use-cases/tarefa/list-tarefas';
import { UpdateTarefaUseCase } from '@/domain/application/use-cases/tarefa/update-tarefa';
import { CompleteTarefaUseCase } from '@/domain/application/use-cases/tarefa/complete-tarefa';
import { DeleteTarefaUseCase } from '@/domain/application/use-cases/tarefa/delete-tarefa';
import type { CurrentUserPayload } from '../auth/current-user.decorator';
import { PrioridadeTarefa } from '@/domain/enterprise/entities/tarefa';
declare class CreateTarefaDto {
    titulo: string;
    descricao?: string;
    prioridade: PrioridadeTarefa;
    dataVencimento: string;
    clienteId?: string;
}
declare class UpdateTarefaDto {
    titulo?: string;
    descricao?: string;
    prioridade?: PrioridadeTarefa;
    dataVencimento?: string;
}
export declare class TarefaController {
    private createTarefa;
    private listTarefas;
    private updateTarefa;
    private completeTarefa;
    private deleteTarefa;
    constructor(createTarefa: CreateTarefaUseCase, listTarefas: ListTarefasUseCase, updateTarefa: UpdateTarefaUseCase, completeTarefa: CompleteTarefaUseCase, deleteTarefa: DeleteTarefaUseCase);
    create(body: CreateTarefaDto, user: CurrentUserPayload): Promise<{
        id: string;
        titulo: string;
        descricao: string | undefined;
        status: import("@/domain/enterprise/entities/tarefa").StatusTarefa;
        prioridade: PrioridadeTarefa;
        dataVencimento: Date;
        clienteId: string | undefined;
        usuarioId: string;
        dataConclusao: Date | undefined;
        createdAt: Date;
    }>;
    list(usuarioId?: string, clienteId?: string): Promise<{
        tarefas: {
            id: string;
            titulo: string;
            descricao: string | undefined;
            status: import("@/domain/enterprise/entities/tarefa").StatusTarefa;
            prioridade: PrioridadeTarefa;
            dataVencimento: Date;
            clienteId: string | undefined;
            usuarioId: string;
            dataConclusao: Date | undefined;
            createdAt: Date;
        }[];
    }>;
    update(id: string, body: UpdateTarefaDto): Promise<{
        id: string;
        titulo: string;
        descricao: string | undefined;
        status: import("@/domain/enterprise/entities/tarefa").StatusTarefa;
        prioridade: PrioridadeTarefa;
        dataVencimento: Date;
        clienteId: string | undefined;
        usuarioId: string;
        dataConclusao: Date | undefined;
        updatedAt: Date | undefined;
    }>;
    complete(id: string): Promise<{
        id: string;
        titulo: string;
        status: import("@/domain/enterprise/entities/tarefa").StatusTarefa;
        dataConclusao: Date | undefined;
    }>;
    delete(id: string): Promise<void>;
}
export {};
