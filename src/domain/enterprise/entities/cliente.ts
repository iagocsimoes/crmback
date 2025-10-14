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

export class Cliente extends Entity<ClienteProps> {
  get nome() {
    return this.props.nome;
  }

  set nome(nome: string) {
    this.props.nome = nome;
    this.touch();
  }

  get telefone() {
    return this.props.telefone;
  }

  set telefone(telefone: string) {
    this.props.telefone = telefone;
    this.touch();
  }

  get email() {
    return this.props.email;
  }

  set email(email: string | undefined) {
    this.props.email = email;
    this.touch();
  }

  get endereco() {
    return this.props.endereco;
  }

  set endereco(endereco: string | undefined) {
    this.props.endereco = endereco;
    this.touch();
  }

  get formaPagamento() {
    return this.props.formaPagamento;
  }

  set formaPagamento(formaPagamento: 'AVISTA' | 'FINANCIADO' | 'PARCELADO' | undefined) {
    this.props.formaPagamento = formaPagamento;
    this.touch();
  }

  get origemLead() {
    return this.props.origemLead;
  }

  set origemLead(origemLead: string | undefined) {
    this.props.origemLead = origemLead;
    this.touch();
  }

  get cpfCnpj() {
    return this.props.cpfCnpj;
  }

  set cpfCnpj(cpfCnpj: string | undefined) {
    this.props.cpfCnpj = cpfCnpj;
    this.touch();
  }

  get observacoes() {
    return this.props.observacoes;
  }

  set observacoes(observacoes: string | undefined) {
    this.props.observacoes = observacoes;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Omit<ClienteProps, 'createdAt'>, id?: UniqueEntityID) {
    const cliente = new Cliente(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return cliente;
  }
}
