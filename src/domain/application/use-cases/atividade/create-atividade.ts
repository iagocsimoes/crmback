import { Injectable } from '@nestjs/common';
import { Atividade, TipoAtividade } from '@/domain/enterprise/entities/atividade';
import { AtividadeRepository } from '../../repositories/atividade-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CreateAtividadeUseCaseRequest {
  clienteId: string;
  usuarioId: string;
  tipo: TipoAtividade;
  descricao: string;
  data: Date;
  duracao?: number;
  observacoes?: string;
}

interface CreateAtividadeUseCaseResponse {
  atividade: Atividade;
}

@Injectable()
export class CreateAtividadeUseCase {
  constructor(private atividadeRepository: AtividadeRepository) {}

  async execute(
    request: CreateAtividadeUseCaseRequest,
  ): Promise<CreateAtividadeUseCaseResponse> {
    const atividade = Atividade.create({
      clienteId: new UniqueEntityID(request.clienteId),
      usuarioId: new UniqueEntityID(request.usuarioId),
      tipo: request.tipo,
      descricao: request.descricao,
      data: request.data,
      duracao: request.duracao,
      observacoes: request.observacoes,
      createdAt: new Date(),
    });

    await this.atividadeRepository.create(atividade);

    return {
      atividade,
    };
  }
}
