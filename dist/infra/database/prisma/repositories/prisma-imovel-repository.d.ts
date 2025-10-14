import { ImovelRepository } from '@/domain/application/repositories/imovel-repository';
import { Imovel } from '@/domain/enterprise/entities/imovel';
import { PrismaService } from '../prisma.service';
export declare class PrismaImovelRepository implements ImovelRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(imovel: Imovel): Promise<void>;
    findById(id: string): Promise<Imovel | null>;
    findAll(): Promise<Imovel[]>;
    findByStatus(status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO'): Promise<Imovel[]>;
    save(imovel: Imovel): Promise<void>;
    delete(id: string): Promise<void>;
}
