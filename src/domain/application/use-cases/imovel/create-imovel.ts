import { Injectable } from '@nestjs/common';
import { Imovel } from '@/domain/enterprise/entities/imovel';
import { ImovelRepository } from '../../repositories/imovel-repository';

interface CreateImovelUseCaseRequest {
  identificacao: string;
  vgv: number;
  status?: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO';
  descricao?: string;
  tipo?: string;
  metragem?: number;
  quartos?: number;
  vagas?: number;
}

interface CreateImovelUseCaseResponse {
  imovel: Imovel;
}

@Injectable()
export class CreateImovelUseCase {
  constructor(private imovelRepository: ImovelRepository) {}

  async execute(
    request: CreateImovelUseCaseRequest,
  ): Promise<CreateImovelUseCaseResponse> {
    const imovel = Imovel.create({
      identificacao: request.identificacao,
      status: request.status ?? 'DISPONIVEL',
      vgv: request.vgv,
      descricao: request.descricao,
      tipo: request.tipo,
      metragem: request.metragem,
      quartos: request.quartos,
      vagas: request.vagas,
    });

    await this.imovelRepository.create(imovel);

    return { imovel };
  }
}
