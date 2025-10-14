import { Injectable } from '@nestjs/common';
import { Atividade } from '@/domain/enterprise/entities/atividade';
import { AtividadeRepository } from '../../repositories/atividade-repository';

interface ListAtividadesUseCaseRequest {
  clienteId?: string;
}

interface ListAtividadesUseCaseResponse {
  atividades: Atividade[];
}

@Injectable()
export class ListAtividadesUseCase {
  constructor(private atividadeRepository: AtividadeRepository) {}

  async execute(
    request: ListAtividadesUseCaseRequest,
  ): Promise<ListAtividadesUseCaseResponse> {
    const atividades = request.clienteId
      ? await this.atividadeRepository.findByClienteId(request.clienteId)
      : await this.atividadeRepository.findAll();

    return {
      atividades,
    };
  }
}
