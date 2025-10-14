import { Imovel as PrismaImovel } from '@prisma/client';
import { Imovel } from '@/domain/enterprise/entities/imovel';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaImovelMapper {
  static toDomain(raw: PrismaImovel): Imovel {
    return Imovel.create(
      {
        identificacao: raw.identificacao,
        status: raw.status as any,
        vgv: raw.vgv,
        valor: raw.valor ?? undefined,
        endereco: raw.endereco ?? undefined,
        descricao: raw.descricao ?? undefined,
        tipo: raw.tipo ?? undefined,
        metragem: raw.metragem ?? undefined,
        quartos: raw.quartos ?? undefined,
        vagas: raw.vagas ?? undefined,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(imovel: Imovel): PrismaImovel {
    return {
      id: imovel.id.toString(),
      identificacao: imovel.identificacao,
      status: imovel.status,
      vgv: imovel.vgv,
      valor: imovel.valor ?? null,
      endereco: imovel.endereco ?? null,
      descricao: imovel.descricao ?? null,
      tipo: imovel.tipo ?? null,
      metragem: imovel.metragem ?? null,
      quartos: imovel.quartos ?? null,
      vagas: imovel.vagas ?? null,
      createdAt: imovel.createdAt,
      updatedAt: imovel.updatedAt ?? new Date(),
    };
  }
}
