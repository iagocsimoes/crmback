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
export declare class UpdateImovelUseCase {
    private imovelRepository;
    constructor(imovelRepository: ImovelRepository);
    execute(request: UpdateImovelUseCaseRequest): Promise<UpdateImovelUseCaseResponse>;
}
export {};
