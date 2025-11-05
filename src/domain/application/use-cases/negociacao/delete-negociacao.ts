import { Injectable } from '@nestjs/common';
import { NegociacaoRepository } from '../../repositories/negociacao-repository';

interface DeleteNegociacaoUseCaseRequest {
  negociacaoId: string;
}

interface DeleteNegociacaoUseCaseResponse {
  success: boolean;
}

@Injectable()
export class DeleteNegociacaoUseCase {
  constructor(private negociacaoRepository: NegociacaoRepository) {}

  async execute(
    request: DeleteNegociacaoUseCaseRequest,
  ): Promise<DeleteNegociacaoUseCaseResponse> {
    const negociacao = await this.negociacaoRepository.findById(
      request.negociacaoId,
    );

    if (!negociacao) {
      throw new Error('Negociação não encontrada');
    }

    await this.negociacaoRepository.delete(request.negociacaoId);

    return {
      success: true,
    };
  }
}
