import { CreateAtividadeUseCase } from '@/domain/application/use-cases/atividade/create-atividade';
import { ListAtividadesUseCase } from '@/domain/application/use-cases/atividade/list-atividades';
import type { CurrentUserPayload } from '../auth/current-user.decorator';
import { TipoAtividade } from '@/domain/enterprise/entities/atividade';
declare class CreateAtividadeDto {
    clienteId: string;
    tipo: TipoAtividade;
    descricao: string;
    data: string;
    duracao?: number;
    observacoes?: string;
}
export declare class AtividadeController {
    private createAtividade;
    private listAtividades;
    constructor(createAtividade: CreateAtividadeUseCase, listAtividades: ListAtividadesUseCase);
    create(body: CreateAtividadeDto, user: CurrentUserPayload): Promise<{
        id: string;
        clienteId: string;
        usuarioId: string;
        tipo: TipoAtividade;
        descricao: string;
        data: Date;
        duracao: number | undefined;
        observacoes: string | undefined;
        createdAt: Date;
    }>;
    list(clienteId?: string): Promise<{
        atividades: {
            id: string;
            clienteId: string;
            usuarioId: string;
            tipo: TipoAtividade;
            descricao: string;
            data: Date;
            duracao: number | undefined;
            observacoes: string | undefined;
            createdAt: Date;
        }[];
    }>;
}
export {};
