import { Atividade } from '@/domain/enterprise/entities/atividade';

export abstract class AtividadeRepository {
  abstract create(atividade: Atividade): Promise<void>;
  abstract findById(id: string): Promise<Atividade | null>;
  abstract findByClienteId(clienteId: string): Promise<Atividade[]>;
  abstract findAll(): Promise<Atividade[]>;
}
