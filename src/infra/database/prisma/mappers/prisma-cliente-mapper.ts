import { Cliente as PrismaCliente } from '@prisma/client';
import { Cliente } from '@/domain/enterprise/entities/cliente';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaClienteMapper {
  static toDomain(raw: PrismaCliente): Cliente {
    return Cliente.create(
      {
        nome: raw.nome,
        telefone: raw.telefone,
        email: raw.email ?? undefined,
        endereco: raw.endereco ?? undefined,
        formaPagamento: raw.formaPagamento as any,
        origemLead: raw.origemLead ?? undefined,
        cpfCnpj: raw.cpfCnpj ?? undefined,
        observacoes: raw.observacoes ?? undefined,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(cliente: Cliente): PrismaCliente {
    return {
      id: cliente.id.toString(),
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email ?? null,
      endereco: cliente.endereco ?? null,
      formaPagamento: cliente.formaPagamento ?? null,
      origemLead: cliente.origemLead ?? null,
      cpfCnpj: cliente.cpfCnpj ?? null,
      observacoes: cliente.observacoes ?? null,
      createdAt: cliente.createdAt,
      updatedAt: cliente.updatedAt ?? new Date(),
    };
  }
}
