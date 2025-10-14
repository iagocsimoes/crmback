import { Injectable } from '@nestjs/common';
import { Imovel } from '@/domain/enterprise/entities/imovel';
import { ImovelRepository } from '../../repositories/imovel-repository';

interface UpdateImovelUseCaseRequest {
  id: string;
  identificacao?: string;
  vgv?: number;
  status?: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO';
  descricao?: string;
  tipo?: string;
  metragem?: number;
  quartos?: number;
  vagas?: number;
}

interface UpdateImovelUseCaseResponse {
  imovel: Imovel;
}

@Injectable()
export class UpdateImovelUseCase {
  constructor(private imovelRepository: ImovelRepository) {}

  async execute(
    request: UpdateImovelUseCaseRequest,
  ): Promise<UpdateImovelUseCaseResponse> {
    const imovel = await this.imovelRepository.findById(request.id);

    if (!imovel) {
      throw new Error('Imóvel não encontrado');
    }

    if (request.identificacao !== undefined) {
      imovel.identificacao = request.identificacao;
    }
    if (request.vgv !== undefined) {
      imovel.vgv = request.vgv;
    }
    if (request.status !== undefined) {
      imovel.status = request.status;
    }
    if (request.descricao !== undefined) {
      imovel.descricao = request.descricao;
    }
    if (request.tipo !== undefined) {
      imovel.tipo = request.tipo;
    }
    if (request.metragem !== undefined) {
      imovel.metragem = request.metragem;
    }
    if (request.quartos !== undefined) {
      imovel.quartos = request.quartos;
    }
    if (request.vagas !== undefined) {
      imovel.vagas = request.vagas;
    }

    await this.imovelRepository.save(imovel);

    return { imovel };
  }
}
