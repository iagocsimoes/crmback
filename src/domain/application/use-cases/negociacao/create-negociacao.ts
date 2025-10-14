import { Injectable } from '@nestjs/common';
import { Negociacao } from '@/domain/enterprise/entities/negociacao';
import { NegociacaoRepository } from '../../repositories/negociacao-repository';
import { ImovelRepository } from '../../repositories/imovel-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CreateNegociacaoUseCaseRequest {
  clienteId: string;
  imovelId: string;
  estagioId: string;
  valor?: number;
  observacoes?: string;
}

interface CreateNegociacaoUseCaseResponse {
  negociacao: Negociacao;
}

@Injectable()
export class CreateNegociacaoUseCase {
  constructor(
    private negociacaoRepository: NegociacaoRepository,
    private imovelRepository: ImovelRepository,
  ) {}

  async execute(
    request: CreateNegociacaoUseCaseRequest,
  ): Promise<CreateNegociacaoUseCaseResponse> {
    const negociacao = Negociacao.create({
      clienteId: new UniqueEntityID(request.clienteId),
      imovelId: new UniqueEntityID(request.imovelId),
      estagioId: new UniqueEntityID(request.estagioId),
      valor: request.valor,
      contratoAssinado: false,
      observacoes: request.observacoes,
    });

    await this.negociacaoRepository.create(negociacao);

    // Atualizar status do imóvel para PRE_RESERVA
    const imovel = await this.imovelRepository.findById(request.imovelId);
    if (imovel && imovel.status === 'DISPONIVEL') {
      imovel.status = 'PRE_RESERVA';
      await this.imovelRepository.save(imovel);
    }

    return { negociacao };
  }
}
