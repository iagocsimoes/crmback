import { EstagioRepository } from '@/domain/application/repositories/estagio-repository';
import { Estagio } from '@/domain/enterprise/entities/estagio';
import { PrismaService } from '../prisma.service';
export declare class PrismaEstagioRepository implements EstagioRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(estagio: Estagio): Promise<void>;
    findById(id: string): Promise<Estagio | null>;
    findAll(): Promise<Estagio[]>;
    findByNome(nome: string): Promise<Estagio | null>;
    save(estagio: Estagio): Promise<void>;
    delete(id: string): Promise<void>;
}
