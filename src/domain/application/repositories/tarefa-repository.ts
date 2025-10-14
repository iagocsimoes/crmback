import { Tarefa } from '@/domain/enterprise/entities/tarefa';

export abstract class TarefaRepository {
  abstract create(tarefa: Tarefa): Promise<void>;
  abstract findById(id: string): Promise<Tarefa | null>;
  abstract findByUsuarioId(usuarioId: string): Promise<Tarefa[]>;
  abstract findByClienteId(clienteId: string): Promise<Tarefa[]>;
  abstract findAll(): Promise<Tarefa[]>;
  abstract save(tarefa: Tarefa): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
