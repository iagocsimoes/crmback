import { Injectable } from '@nestjs/common';
import { ClienteRepository } from '@/domain/application/repositories/cliente-repository';
import { Cliente } from '@/domain/enterprise/entities/cliente';
import { PrismaService } from '../prisma.service';
import { PrismaClienteMapper } from '../mappers/prisma-cliente-mapper';

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private prisma: PrismaService) {}

  async create(cliente: Cliente): Promise<void> {
    const data = PrismaClienteMapper.toPrisma(cliente);
    await this.prisma.cliente.create({ data });
  }

  async findById(id: string): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!cliente) {
      return null;
    }

    return PrismaClienteMapper.toDomain(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return clientes.map(PrismaClienteMapper.toDomain);
  }

  async save(cliente: Cliente): Promise<void> {
    const data = PrismaClienteMapper.toPrisma(cliente);
    await this.prisma.cliente.update({
      where: { id: cliente.id.toString() },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cliente.delete({
      where: { id },
    });
  }
}
