import { Injectable } from '@nestjs/common';
import { Tarefa } from '@/domain/enterprise/entities/tarefa';
import { TarefaRepository } from '../../repositories/tarefa-repository';

interface ListTarefasUseCaseRequest {
  usuarioId?: string;
  clienteId?: string;
}

interface ListTarefasUseCaseResponse {
  tarefas: Tarefa[];
}

@Injectable()
export class ListTarefasUseCase {
  constructor(private tarefaRepository: TarefaRepository) {}

  async execute(
    request: ListTarefasUseCaseRequest,
  ): Promise<ListTarefasUseCaseResponse> {
    let tarefas: Tarefa[];

    if (request.clienteId) {
      tarefas = await this.tarefaRepository.findByClienteId(request.clienteId);
    } else if (request.usuarioId) {
      tarefas = await this.tarefaRepository.findByUsuarioId(request.usuarioId);
    } else {
      tarefas = await this.tarefaRepository.findAll();
    }

    // Atualiza status de tarefas atrasadas
    tarefas.forEach((tarefa) => tarefa.verificarSeAtrasada());

    return {
      tarefas,
    };
  }
}
