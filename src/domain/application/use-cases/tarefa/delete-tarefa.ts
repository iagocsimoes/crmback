import { Injectable } from '@nestjs/common';
import { TarefaRepository } from '../../repositories/tarefa-repository';

interface DeleteTarefaUseCaseRequest {
  tarefaId: string;
}

interface DeleteTarefaUseCaseResponse {
  success: boolean;
}

@Injectable()
export class DeleteTarefaUseCase {
  constructor(private tarefaRepository: TarefaRepository) {}

  async execute(
    request: DeleteTarefaUseCaseRequest,
  ): Promise<DeleteTarefaUseCaseResponse> {
    const tarefa = await this.tarefaRepository.findById(request.tarefaId);

    if (!tarefa) {
      throw new Error('Tarefa não encontrada');
    }

    await this.tarefaRepository.delete(request.tarefaId);

    return {
      success: true,
    };
  }
}
