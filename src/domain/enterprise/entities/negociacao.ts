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
  canalVenda?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Negociacao extends AggregateRoot<NegociacaoProps> {
  get clienteId() {
    return this.props.clienteId;
  }

  get imovelId() {
    return this.props.imovelId;
  }

  get estagioId() {
    return this.props.estagioId;
  }

  set estagioId(estagioId: UniqueEntityID) {
    this.props.estagioId = estagioId;
    this.touch();
  }

  get valor() {
    return this.props.valor;
  }

  set valor(valor: number | undefined) {
    this.props.valor = valor;
    this.touch();
  }

  get formaPagamento() {
    return this.props.formaPagamento;
  }

  set formaPagamento(formaPagamento: string | undefined) {
    this.props.formaPagamento = formaPagamento;
    this.touch();
  }

  get valorEntrada() {
    return this.props.valorEntrada;
  }

  set valorEntrada(valorEntrada: number | undefined) {
    this.props.valorEntrada = valorEntrada;
    this.touch();
  }

  get numeroParcelas() {
    return this.props.numeroParcelas;
  }

  set numeroParcelas(numeroParcelas: number | undefined) {
    this.props.numeroParcelas = numeroParcelas;
    this.touch();
  }

  get contratoAssinado() {
    return this.props.contratoAssinado;
  }

  set contratoAssinado(contratoAssinado: boolean) {
    this.props.contratoAssinado = contratoAssinado;
    this.touch();
  }

  get dataAssinatura() {
    return this.props.dataAssinatura;
  }

  set dataAssinatura(dataAssinatura: Date | string | undefined) {
    this.props.dataAssinatura = dataAssinatura ? new Date(dataAssinatura) : undefined;
    this.touch();
  }

  get dataVencimento() {
    return this.props.dataVencimento;
  }

  set dataVencimento(dataVencimento: Date | string | undefined) {
    this.props.dataVencimento = dataVencimento ? new Date(dataVencimento) : undefined;
    this.touch();
  }

  get observacoes() {
    return this.props.observacoes;
  }

  set observacoes(observacoes: string | undefined) {
    this.props.observacoes = observacoes;
    this.touch();
  }

  get canalVenda() {
    return this.props.canalVenda;
  }

  set canalVenda(canalVenda: string | undefined) {
    this.props.canalVenda = canalVenda;
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

  static create(props: Omit<NegociacaoProps, 'createdAt'>, id?: UniqueEntityID) {
    const negociacao = new Negociacao(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return negociacao;
  }
}
