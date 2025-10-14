import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UpdateTarefaUseCase {
  constructor(private tarefaRepository: TarefaRepository) {}

  async execute(
    request: UpdateTarefaUseCaseRequest,
  ): Promise<UpdateTarefaUseCaseResponse> {
    const tarefa = await this.tarefaRepository.findById(request.tarefaId);

    if (!tarefa) {
      throw new Error('Tarefa não encontrada');
    }

    if (request.titulo !== undefined) {
      tarefa.titulo = request.titulo;
    }

    if (request.descricao !== undefined) {
      tarefa.descricao = request.descricao;
    }

    if (request.prioridade !== undefined) {
      tarefa.prioridade = request.prioridade;
    }

    if (request.dataVencimento !== undefined) {
      tarefa.dataVencimento = request.dataVencimento;
    }

    tarefa.verificarSeAtrasada();

    await this.tarefaRepository.save(tarefa);

    return {
      tarefa,
    };
  }
}
