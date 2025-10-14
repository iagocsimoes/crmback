import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AtividadeRepository } from '@/domain/application/repositories/atividade-repository';
import { Atividade } from '@/domain/enterprise/entities/atividade';
import { PrismaAtividadeMapper } from '../mappers/prisma-atividade-mapper';

@Injectable()
export class PrismaAtividadeRepository implements AtividadeRepository {
  constructor(private prisma: PrismaService) {}

  async create(atividade: Atividade): Promise<void> {
    const data = PrismaAtividadeMapper.toPrisma(atividade);
    await this.prisma.atividade.create({ data });
  }

  async findById(id: string): Promise<Atividade | null> {
    const atividade = await this.prisma.atividade.findUnique({
      where: { id },
    });

    if (!atividade) {
      return null;
    }

    return PrismaAtividadeMapper.toDomain(atividade);
  }

  async findByClienteId(clienteId: string): Promise<Atividade[]> {
    const atividades = await this.prisma.atividade.findMany({
      where: { clienteId },
      orderBy: { data: 'desc' },
    });

    return atividades.map(PrismaAtividadeMapper.toDomain);
  }

  async findAll(): Promise<Atividade[]> {
    const atividades = await this.prisma.atividade.findMany({
      orderBy: { data: 'desc' },
    });

    return atividades.map(PrismaAtividadeMapper.toDomain);
  }
}
