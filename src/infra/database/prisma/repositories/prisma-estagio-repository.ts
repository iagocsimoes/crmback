import { Injectable } from '@nestjs/common';
import { EstagioRepository } from '@/domain/application/repositories/estagio-repository';
import { Estagio } from '@/domain/enterprise/entities/estagio';
import { PrismaService } from '../prisma.service';
import { PrismaEstagioMapper } from '../mappers/prisma-estagio-mapper';

@Injectable()
export class PrismaEstagioRepository implements EstagioRepository {
  constructor(private prisma: PrismaService) {}

  async create(estagio: Estagio): Promise<void> {
    const data = PrismaEstagioMapper.toPrisma(estagio);
    await this.prisma.estagio.create({ data });
  }

  async findById(id: string): Promise<Estagio | null> {
    const estagio = await this.prisma.estagio.findUnique({
      where: { id },
    });

    if (!estagio) {
      return null;
    }

    return PrismaEstagioMapper.toDomain(estagio);
  }

  async findAll(): Promise<Estagio[]> {
    const estagios = await this.prisma.estagio.findMany({
      orderBy: { ordem: 'asc' },
    });

    return estagios.map(PrismaEstagioMapper.toDomain);
  }

  async findByNome(nome: string): Promise<Estagio | null> {
    const estagio = await this.prisma.estagio.findUnique({
      where: { nome },
    });

    if (!estagio) {
      return null;
    }

    return PrismaEstagioMapper.toDomain(estagio);
  }

  async save(estagio: Estagio): Promise<void> {
    const data = PrismaEstagioMapper.toPrisma(estagio);
    await this.prisma.estagio.update({
      where: { id: estagio.id.toString() },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.estagio.delete({
      where: { id },
    });
  }
}
