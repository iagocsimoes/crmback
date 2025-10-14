import { Injectable } from '@nestjs/common';
import { Tarefa, PrioridadeTarefa } from '@/domain/enterprise/entities/tarefa';
import { TarefaRepository } from '../../repositories/tarefa-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

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

@Injectable()
export class CreateTarefaUseCase {
  constructor(private tarefaRepository: TarefaRepository) {}

  async execute(
    request: CreateTarefaUseCaseRequest,
  ): Promise<CreateTarefaUseCaseResponse> {
    const tarefa = Tarefa.create({
      titulo: request.titulo,
      descricao: request.descricao,
      status: 'PENDENTE',
      prioridade: request.prioridade,
      dataVencimento: request.dataVencimento,
      clienteId: request.clienteId
        ? new UniqueEntityID(request.clienteId)
        : undefined,
      usuarioId: new UniqueEntityID(request.usuarioId),
      createdAt: new Date(),
    });

    await this.tarefaRepository.create(tarefa);

    return {
      tarefa,
    };
  }
}
