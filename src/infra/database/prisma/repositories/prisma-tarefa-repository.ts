import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TarefaRepository } from '@/domain/application/repositories/tarefa-repository';
import { Tarefa } from '@/domain/enterprise/entities/tarefa';
import { PrismaTarefaMapper } from '../mappers/prisma-tarefa-mapper';

@Injectable()
export class PrismaTarefaRepository implements TarefaRepository {
  constructor(private prisma: PrismaService) {}

  async create(tarefa: Tarefa): Promise<void> {
    const data = PrismaTarefaMapper.toPrisma(tarefa);
    await this.prisma.tarefa.create({ data });
  }

  async findById(id: string): Promise<Tarefa | null> {
    const tarefa = await this.prisma.tarefa.findUnique({
      where: { id },
    });

    if (!tarefa) {
      return null;
    }

    return PrismaTarefaMapper.toDomain(tarefa);
  }

  async findByUsuarioId(usuarioId: string): Promise<Tarefa[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      where: { usuarioId },
      orderBy: { dataVencimento: 'asc' },
    });

    return tarefas.map(PrismaTarefaMapper.toDomain);
  }

  async findByClienteId(clienteId: string): Promise<Tarefa[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      where: { clienteId },
      orderBy: { dataVencimento: 'asc' },
    });

    return tarefas.map(PrismaTarefaMapper.toDomain);
  }

  async findAll(): Promise<Tarefa[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      orderBy: { dataVencimento: 'asc' },
    });

    return tarefas.map(PrismaTarefaMapper.toDomain);
  }

  async save(tarefa: Tarefa): Promise<void> {
    const data = PrismaTarefaMapper.toPrisma(tarefa);
    await this.prisma.tarefa.update({
      where: { id: tarefa.id.toString() },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tarefa.delete({
      where: { id },
    });
  }
}
