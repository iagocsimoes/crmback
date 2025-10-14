import { Imovel } from '@/domain/enterprise/entities/imovel';
export declare abstract class ImovelRepository {
    abstract create(imovel: Imovel): Promise<void>;
    abstract findById(id: string): Promise<Imovel | null>;
    abstract findAll(): Promise<Imovel[]>;
    abstract findByStatus(status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO'): Promise<Imovel[]>;
    abstract save(imovel: Imovel): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
