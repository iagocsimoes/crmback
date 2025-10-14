import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface ClienteProps {
    nome: string;
    telefone: string;
    email?: string;
    endereco?: string;
    formaPagamento?: 'AVISTA' | 'FINANCIADO' | 'PARCELADO';
    origemLead?: string;
    cpfCnpj?: string;
    observacoes?: string;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Cliente extends Entity<ClienteProps> {
    get nome(): string;
    set nome(nome: string);
    get telefone(): string;
    set telefone(telefone: string);
    get email(): string | undefined;
    set email(email: string | undefined);
    get endereco(): string | undefined;
    set endereco(endereco: string | undefined);
    get formaPagamento(): "AVISTA" | "FINANCIADO" | "PARCELADO" | undefined;
    set formaPagamento(formaPagamento: 'AVISTA' | 'FINANCIADO' | 'PARCELADO' | undefined);
    get origemLead(): string | undefined;
    set origemLead(origemLead: string | undefined);
    get cpfCnpj(): string | undefined;
    set cpfCnpj(cpfCnpj: string | undefined);
    get observacoes(): string | undefined;
    set observacoes(observacoes: string | undefined);
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    private touch;
    static create(props: Omit<ClienteProps, 'createdAt'>, id?: UniqueEntityID): Cliente;
}
