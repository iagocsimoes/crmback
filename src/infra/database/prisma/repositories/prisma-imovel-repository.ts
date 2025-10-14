import { Injectable } from '@nestjs/common';
import { ImovelRepository } from '@/domain/application/repositories/imovel-repository';
import { Imovel } from '@/domain/enterprise/entities/imovel';
import { PrismaService } from '../prisma.service';
import { PrismaImovelMapper } from '../mappers/prisma-imovel-mapper';

@Injectable()
export class PrismaImovelRepository implements ImovelRepository {
  constructor(private prisma: PrismaService) {}

  async create(imovel: Imovel): Promise<void> {
    const data = PrismaImovelMapper.toPrisma(imovel);
    await this.prisma.imovel.create({ data });
  }

  async findById(id: string): Promise<Imovel | null> {
    const imovel = await this.prisma.imovel.findUnique({
      where: { id },
    });

    if (!imovel) {
      return null;
    }

    return PrismaImovelMapper.toDomain(imovel);
  }

  async findAll(): Promise<Imovel[]> {
    const imoveis = await this.prisma.imovel.findMany({
      orderBy: { identificacao: 'asc' },
    });

    return imoveis.map(PrismaImovelMapper.toDomain);
  }

  async findByStatus(
    status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO',
  ): Promise<Imovel[]> {
    const imoveis = await this.prisma.imovel.findMany({
      where: { status },
      orderBy: { identificacao: 'asc' },
    });

    return imoveis.map(PrismaImovelMapper.toDomain);
  }

  async save(imovel: Imovel): Promise<void> {
    const data = PrismaImovelMapper.toPrisma(imovel);
    await this.prisma.imovel.update({
      where: { id: imovel.id.toString() },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.imovel.delete({
      where: { id },
    });
  }
}
