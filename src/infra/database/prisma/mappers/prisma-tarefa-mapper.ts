import { Tarefa as PrismaTarefa } from '@prisma/client';
import {
  Tarefa,
  StatusTarefa,
  PrioridadeTarefa,
} from '@/domain/enterprise/entities/tarefa';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaTarefaMapper {
  static toDomain(raw: PrismaTarefa): Tarefa {
    return Tarefa.create(
      {
        titulo: raw.titulo,
        descricao: raw.descricao ?? undefined,
        status: raw.status as StatusTarefa,
        prioridade: raw.prioridade as PrioridadeTarefa,
        dataVencimento: raw.dataVencimento,
        clienteId: raw.clienteId
          ? new UniqueEntityID(raw.clienteId)
          : undefined,
        usuarioId: new UniqueEntityID(raw.usuarioId),
        dataConclusao: raw.dataConclusao ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(tarefa: Tarefa) {
    return {
      id: tarefa.id.toString(),
      titulo: tarefa.titulo,
      descricao: tarefa.descricao ?? null,
      status: tarefa.status,
      prioridade: tarefa.prioridade,
      dataVencimento: tarefa.dataVencimento,
      clienteId: tarefa.clienteId?.toString() ?? null,
      usuarioId: tarefa.usuarioId.toString(),
      dataConclusao: tarefa.dataConclusao ?? null,
      createdAt: tarefa.createdAt,
      updatedAt: tarefa.updatedAt ?? null,
    };
  }
}
