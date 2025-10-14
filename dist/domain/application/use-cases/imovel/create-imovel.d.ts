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
export declare class CreateImovelUseCase {
    private imovelRepository;
    constructor(imovelRepository: ImovelRepository);
    execute(request: CreateImovelUseCaseRequest): Promise<CreateImovelUseCaseResponse>;
}
export {};
