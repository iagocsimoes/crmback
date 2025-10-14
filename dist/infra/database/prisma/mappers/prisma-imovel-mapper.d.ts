import { Imovel as PrismaImovel } from '@prisma/client';
import { Imovel } from '@/domain/enterprise/entities/imovel';
export declare class PrismaImovelMapper {
    static toDomain(raw: PrismaImovel): Imovel;
    static toPrisma(imovel: Imovel): PrismaImovel;
}
