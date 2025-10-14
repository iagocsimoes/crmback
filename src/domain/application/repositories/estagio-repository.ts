import { Estagio } from '@/domain/enterprise/entities/estagio';

export abstract class EstagioRepository {
  abstract create(estagio: Estagio): Promise<void>;
  abstract findById(id: string): Promise<Estagio | null>;
  abstract findAll(): Promise<Estagio[]>;
  abstract findByNome(nome: string): Promise<Estagio | null>;
  abstract save(estagio: Estagio): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
