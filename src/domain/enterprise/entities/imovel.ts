import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface ImovelProps {
  identificacao: string; // Ex: A-101, B-203, Casa 5
  status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO';
  vgv: number; // Valor Geral de Vendas
  valor?: number;
  endereco?: string;
  descricao?: string;
  tipo?: string; // Ex: Apartamento, Casa, Sala comercial
  metragem?: number;
  quartos?: number;
  vagas?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Imovel extends Entity<ImovelProps> {
  get identificacao() {
    return this.props.identificacao;
  }

  set identificacao(identificacao: string) {
    this.props.identificacao = identificacao;
    this.touch();
  }

  get status() {
    return this.props.status;
  }

  set status(status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO') {
    this.props.status = status;
    this.touch();
  }

  get vgv() {
    return this.props.vgv;
  }

  set vgv(vgv: number) {
    this.props.vgv = vgv;
    this.touch();
  }

  get valor() {
    return this.props.valor;
  }

  set valor(valor: number | undefined) {
    this.props.valor = valor;
    this.touch();
  }

  get endereco() {
    return this.props.endereco;
  }

  set endereco(endereco: string | undefined) {
    this.props.endereco = endereco;
    this.touch();
  }

  get descricao() {
    return this.props.descricao;
  }

  set descricao(descricao: string | undefined) {
    this.props.descricao = descricao;
    this.touch();
  }

  get tipo() {
    return this.props.tipo;
  }

  set tipo(tipo: string | undefined) {
    this.props.tipo = tipo;
    this.touch();
  }

  get metragem() {
    return this.props.metragem;
  }

  set metragem(metragem: number | undefined) {
    this.props.metragem = metragem;
    this.touch();
  }

  get quartos() {
    return this.props.quartos;
  }

  set quartos(quartos: number | undefined) {
    this.props.quartos = quartos;
    this.touch();
  }

  get vagas() {
    return this.props.vagas;
  }

  set vagas(vagas: number | undefined) {
    this.props.vagas = vagas;
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

  static create(props: Omit<ImovelProps, 'createdAt'>, id?: UniqueEntityID) {
    const imovel = new Imovel(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return imovel;
  }
}
