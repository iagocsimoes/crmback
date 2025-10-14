import { Injectable } from '@nestjs/common';
import { Estagio } from '@/domain/enterprise/entities/estagio';
import { EstagioRepository } from '../../repositories/estagio-repository';

interface CreateEstagioUseCaseRequest {
  nome: string;
  ordem: number;
  cor?: string;
}

interface CreateEstagioUseCaseResponse {
  estagio: Estagio;
}

@Injectable()
export class CreateEstagioUseCase {
  constructor(private estagioRepository: EstagioRepository) {}

  async execute(
    request: CreateEstagioUseCaseRequest,
  ): Promise<CreateEstagioUseCaseResponse> {
    const estagio = Estagio.create({
      nome: request.nome,
      ordem: request.ordem,
      cor: request.cor,
    });

    await this.estagioRepository.create(estagio);

    return { estagio };
  }
}
