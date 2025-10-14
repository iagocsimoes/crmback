import { PrismaService } from '../prisma.service';
import { AtividadeRepository } from '@/domain/application/repositories/atividade-repository';
import { Atividade } from '@/domain/enterprise/entities/atividade';
export declare class PrismaAtividadeRepository implements AtividadeRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(atividade: Atividade): Promise<void>;
    findById(id: string): Promise<Atividade | null>;
    findByClienteId(clienteId: string): Promise<Atividade[]>;
    findAll(): Promise<Atividade[]>;
}
