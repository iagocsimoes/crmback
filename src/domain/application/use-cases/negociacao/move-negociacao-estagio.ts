import { Injectable } from '@nestjs/common';
import { NegociacaoRepository } from '../../repositories/negociacao-repository';
import { ImovelRepository } from '../../repositories/imovel-repository';
import { EstagioRepository } from '../../repositories/estagio-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface MoveNegociacaoEstagioUseCaseRequest {
  negociacaoId: string;
  novoEstagioId: string;
}

interface MoveNegociacaoEstagioUseCaseResponse {
  success: boolean;
}

@Injectable()
export class MoveNegociacaoEstagioUseCase {
  constructor(
    private negociacaoRepository: NegociacaoRepository,
    private imovelRepository: ImovelRepository,
    private estagioRepository: EstagioRepository,
  ) {}

  async execute(
    request: MoveNegociacaoEstagioUseCaseRequest,
  ): Promise<MoveNegociacaoEstagioUseCaseResponse> {
    const negociacao = await this.negociacaoRepository.findById(
      request.negociacaoId,
    );

    if (!negociacao) {
      throw new Error('Negociação não encontrada');
    }

    const novoEstagio = await this.estagioRepository.findById(
      request.novoEstagioId,
    );

    if (!novoEstagio) {
      throw new Error('Estágio não encontrado');
    }

    // Atualizar estágio da negociação
    negociacao.estagioId = new UniqueEntityID(request.novoEstagioId);
    await this.negociacaoRepository.save(negociacao);

    // Lógica especial: Se o estágio for "GANHO", marcar imóvel como VENDIDO
    if (novoEstagio.nome.toUpperCase() === 'GANHO') {
      const imovel = await this.imovelRepository.findById(
        negociacao.imovelId.toString(),
      );
      if (imovel) {
        imovel.status = 'VENDIDO';
        await this.imovelRepository.save(imovel);
      }
    }

    // Lógica especial: Se o estágio for "PERDIDO", voltar imóvel para DISPONIVEL
    if (novoEstagio.nome.toUpperCase() === 'PERDIDO') {
      const imovel = await this.imovelRepository.findById(
        negociacao.imovelId.toString(),
      );
      if (imovel && imovel.status !== 'VENDIDO') {
        imovel.status = 'DISPONIVEL';
        await this.imovelRepository.save(imovel);
      }
    }

    return { success: true };
  }
}
