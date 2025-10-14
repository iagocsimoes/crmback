import { Injectable } from '@nestjs/common';
import { Tarefa } from '@/domain/enterprise/entities/tarefa';
import { TarefaRepository } from '../../repositories/tarefa-repository';

interface CompleteTarefaUseCaseRequest {
  tarefaId: string;
}

interface CompleteTarefaUseCaseResponse {
  tarefa: Tarefa;
}

@Injectable()
export class CompleteTarefaUseCase {
  constructor(private tarefaRepository: TarefaRepository) {}

  async execute(
    request: CompleteTarefaUseCaseRequest,
  ): Promise<CompleteTarefaUseCaseResponse> {
    const tarefa = await this.tarefaRepository.findById(request.tarefaId);

    if (!tarefa) {
      throw new Error('Tarefa não encontrada');
    }

    tarefa.marcarComoConcluida();

    await this.tarefaRepository.save(tarefa);

    return {
      tarefa,
    };
  }
}
