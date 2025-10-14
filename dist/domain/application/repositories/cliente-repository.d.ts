import { Cliente } from '@/domain/enterprise/entities/cliente';
export declare abstract class ClienteRepository {
    abstract create(cliente: Cliente): Promise<void>;
    abstract findById(id: string): Promise<Cliente | null>;
    abstract findAll(): Promise<Cliente[]>;
    abstract save(cliente: Cliente): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
