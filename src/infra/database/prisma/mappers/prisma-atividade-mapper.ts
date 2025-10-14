import { Atividade as PrismaAtividade } from '@prisma/client';
import { Atividade, TipoAtividade } from '@/domain/enterprise/entities/atividade';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaAtividadeMapper {
  static toDomain(raw: PrismaAtividade): Atividade {
    return Atividade.create(
      {
        clienteId: new UniqueEntityID(raw.clienteId),
        usuarioId: new UniqueEntityID(raw.usuarioId),
        tipo: raw.tipo as TipoAtividade,
        descricao: raw.descricao,
        data: raw.data,
        duracao: raw.duracao ?? undefined,
        observacoes: raw.observacoes ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(atividade: Atividade) {
    return {
      id: atividade.id.toString(),
      clienteId: atividade.clienteId.toString(),
      usuarioId: atividade.usuarioId.toString(),
      tipo: atividade.tipo,
      descricao: atividade.descricao,
      data: atividade.data,
      duracao: atividade.duracao ?? null,
      observacoes: atividade.observacoes ?? null,
      createdAt: atividade.createdAt,
      updatedAt: atividade.updatedAt ?? null,
    };
  }
}
