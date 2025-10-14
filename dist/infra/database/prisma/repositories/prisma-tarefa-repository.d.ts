import { PrismaService } from '../prisma.service';
import { TarefaRepository } from '@/domain/application/repositories/tarefa-repository';
import { Tarefa } from '@/domain/enterprise/entities/tarefa';
export declare class PrismaTarefaRepository implements TarefaRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(tarefa: Tarefa): Promise<void>;
    findById(id: string): Promise<Tarefa | null>;
    findByUsuarioId(usuarioId: string): Promise<Tarefa[]>;
    findByClienteId(clienteId: string): Promise<Tarefa[]>;
    findAll(): Promise<Tarefa[]>;
    save(tarefa: Tarefa): Promise<void>;
    delete(id: string): Promise<void>;
}
