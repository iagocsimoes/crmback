import { Negociacao } from '@/domain/enterprise/entities/negociacao';
export interface NegociacaoComDetalhes {
    negociacao: Negociacao;
    clienteNome: string;
    clienteEmail: string | null;
    clienteTelefone: string;
    clienteCpfCnpj: string | null;
    imovelIdentificacao: string;
    imovelTipo: string | null;
    imovelEndereco: string | null;
    imovelValor: number | null;
    imovelMetragem: number | null;
    imovelQuartos: number | null;
    imovelVagas: number | null;
    estagioNome: string;
}
export declare abstract class NegociacaoRepository {
    abstract create(negociacao: Negociacao): Promise<void>;
    abstract findById(id: string): Promise<Negociacao | null>;
    abstract findAll(): Promise<Negociacao[]>;
    abstract findByClienteId(clienteId: string): Promise<Negociacao[]>;
    abstract findByImovelId(imovelId: string): Promise<Negociacao[]>;
    abstract findByEstagioId(estagioId: string): Promise<Negociacao[]>;
    abstract findAllComDetalhes(): Promise<NegociacaoComDetalhes[]>;
    abstract save(negociacao: Negociacao): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
