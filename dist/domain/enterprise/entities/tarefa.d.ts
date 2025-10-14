import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export type StatusTarefa = 'PENDENTE' | 'CONCLUIDA' | 'ATRASADA';
export type PrioridadeTarefa = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
export interface TarefaProps {
    titulo: string;
    descricao?: string;
    status: StatusTarefa;
    prioridade: PrioridadeTarefa;
    dataVencimento: Date;
    clienteId?: UniqueEntityID;
    usuarioId: UniqueEntityID;
    dataConclusao?: Date;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Tarefa extends Entity<TarefaProps> {
    get titulo(): string;
    get descricao(): string | undefined;
    get status(): StatusTarefa;
    get prioridade(): PrioridadeTarefa;
    get dataVencimento(): Date;
    get clienteId(): UniqueEntityID | undefined;
    get usuarioId(): UniqueEntityID;
    get dataConclusao(): Date | undefined;
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    set titulo(titulo: string);
    set descricao(descricao: string | undefined);
    set status(status: StatusTarefa);
    set prioridade(prioridade: PrioridadeTarefa);
    set dataVencimento(dataVencimento: Date);
    set dataConclusao(dataConclusao: Date | undefined);
    marcarComoConcluida(): void;
    verificarSeAtrasada(): void;
    private touch;
    static create(props: TarefaProps, id?: UniqueEntityID): Tarefa;
}
