import { Estagio as PrismaEstagio } from '@prisma/client';
import { Estagio } from '@/domain/enterprise/entities/estagio';
export declare class PrismaEstagioMapper {
    static toDomain(raw: PrismaEstagio): Estagio;
    static toPrisma(estagio: Estagio): PrismaEstagio;
}
