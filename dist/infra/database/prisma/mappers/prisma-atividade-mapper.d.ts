import { Atividade as PrismaAtividade } from '@prisma/client';
import { Atividade, TipoAtividade } from '@/domain/enterprise/entities/atividade';
export declare class PrismaAtividadeMapper {
    static toDomain(raw: PrismaAtividade): Atividade;
    static toPrisma(atividade: Atividade): {
        id: string;
        clienteId: string;
        usuarioId: string;
        tipo: TipoAtividade;
        descricao: string;
        data: Date;
        duracao: number | null;
        observacoes: string | null;
        createdAt: Date;
        updatedAt: Date | null;
    };
}
