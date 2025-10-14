import { ClienteRepository } from '@/domain/application/repositories/cliente-repository';
import { Cliente } from '@/domain/enterprise/entities/cliente';
import { PrismaService } from '../prisma.service';
export declare class PrismaClienteRepository implements ClienteRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(cliente: Cliente): Promise<void>;
    findById(id: string): Promise<Cliente | null>;
    findAll(): Promise<Cliente[]>;
    save(cliente: Cliente): Promise<void>;
    delete(id: string): Promise<void>;
}
