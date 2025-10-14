import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export type TipoAtividade =
  | 'LIGACAO'
  | 'EMAIL'
  | 'REUNIAO'
  | 'VISITA'
  | 'WHATSAPP'
  | 'OUTRO';

export interface AtividadeProps {
  clienteId: UniqueEntityID;
  usuarioId: UniqueEntityID;
  tipo: TipoAtividade;
  descricao: string;
  data: Date;
  duracao?: number; // em minutos
  observacoes?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Atividade extends Entity<AtividadeProps> {
  get clienteId() {
    return this.props.clienteId;
  }

  get usuarioId() {
    return this.props.usuarioId;
  }

  get tipo() {
    return this.props.tipo;
  }

  get descricao() {
    return this.props.descricao;
  }

  get data() {
    return this.props.data;
  }

  get duracao() {
    return this.props.duracao;
  }

  get observacoes() {
    return this.props.observacoes;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set tipo(tipo: TipoAtividade) {
    this.props.tipo = tipo;
    this.touch();
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao;
    this.touch();
  }

  set data(data: Date) {
    this.props.data = data;
    this.touch();
  }

  set duracao(duracao: number | undefined) {
    this.props.duracao = duracao;
    this.touch();
  }

  set observacoes(observacoes: string | undefined) {
    this.props.observacoes = observacoes;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: AtividadeProps, id?: UniqueEntityID) {
    const atividade = new Atividade(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return atividade;
  }
}
