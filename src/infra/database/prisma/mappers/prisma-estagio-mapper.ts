import { Estagio as PrismaEstagio } from '@prisma/client';
import { Estagio } from '@/domain/enterprise/entities/estagio';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaEstagioMapper {
  static toDomain(raw: PrismaEstagio): Estagio {
    return Estagio.create(
      {
        nome: raw.nome,
        ordem: raw.ordem,
        cor: raw.cor ?? undefined,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(estagio: Estagio): PrismaEstagio {
    return {
      id: estagio.id.toString(),
      nome: estagio.nome,
      ordem: estagio.ordem,
      cor: estagio.cor ?? null,
      createdAt: estagio.createdAt,
      updatedAt: estagio.updatedAt ?? new Date(),
    };
  }
}
