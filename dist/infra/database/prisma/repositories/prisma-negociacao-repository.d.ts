import { NegociacaoRepository, NegociacaoComDetalhes } from '@/domain/application/repositories/negociacao-repository';
import { Negociacao } from '@/domain/enterprise/entities/negociacao';
import { PrismaService } from '../prisma.service';
export declare class PrismaNegociacaoRepository implements NegociacaoRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(negociacao: Negociacao): Promise<void>;
    findById(id: string): Promise<Negociacao | null>;
    findAll(): Promise<Negociacao[]>;
    findByClienteId(clienteId: string): Promise<Negociacao[]>;
    findByImovelId(imovelId: string): Promise<Negociacao[]>;
    findByEstagioId(estagioId: string): Promise<Negociacao[]>;
    findAllComDetalhes(): Promise<NegociacaoComDetalhes[]>;
    save(negociacao: Negociacao): Promise<void>;
    delete(id: string): Promise<void>;
}
