import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface NegociacaoProps {
    clienteId: UniqueEntityID;
    imovelId: UniqueEntityID;
    estagioId: UniqueEntityID;
    valor?: number;
    formaPagamento?: string;
    valorEntrada?: number;
    numeroParcelas?: number;
    contratoAssinado: boolean;
    dataAssinatura?: Date;
    dataVencimento?: Date;
    observacoes?: string;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Negociacao extends AggregateRoot<NegociacaoProps> {
    get clienteId(): UniqueEntityID;
    get imovelId(): UniqueEntityID;
    get estagioId(): UniqueEntityID;
    set estagioId(estagioId: UniqueEntityID);
    get valor(): number | undefined;
    set valor(valor: number | undefined);
    get formaPagamento(): string | undefined;
    set formaPagamento(formaPagamento: string | undefined);
    get valorEntrada(): number | undefined;
    set valorEntrada(valorEntrada: number | undefined);
    get numeroParcelas(): number | undefined;
    set numeroParcelas(numeroParcelas: number | undefined);
    get contratoAssinado(): boolean;
    set contratoAssinado(contratoAssinado: boolean);
    get dataAssinatura(): Date | string | undefined;
    set dataAssinatura(dataAssinatura: Date | string | undefined);
    get dataVencimento(): Date | string | undefined;
    set dataVencimento(dataVencimento: Date | string | undefined);
    get observacoes(): string | undefined;
    set observacoes(observacoes: string | undefined);
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    private touch;
    static create(props: Omit<NegociacaoProps, 'createdAt'>, id?: UniqueEntityID): Negociacao;
}
