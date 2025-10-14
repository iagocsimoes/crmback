import { Tarefa as PrismaTarefa } from '@prisma/client';
import { Tarefa, StatusTarefa, PrioridadeTarefa } from '@/domain/enterprise/entities/tarefa';
export declare class PrismaTarefaMapper {
    static toDomain(raw: PrismaTarefa): Tarefa;
    static toPrisma(tarefa: Tarefa): {
        id: string;
        titulo: string;
        descricao: string | null;
        status: StatusTarefa;
        prioridade: PrioridadeTarefa;
        dataVencimento: Date;
        clienteId: string | null;
        usuarioId: string;
        dataConclusao: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
    };
}
