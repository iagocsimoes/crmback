import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export type StatusTarefa = 'PENDENTE' | 'CONCLUIDA' | 'ATRASADA';
export type PrioridadeTarefa = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface TarefaProps {
  titulo: string;
  descricao?: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
  dataVencimento: Date;
  clienteId?: UniqueEntityID;
  usuarioId: UniqueEntityID;
  dataConclusao?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export class Tarefa extends Entity<TarefaProps> {
  get titulo() {
    return this.props.titulo;
  }

  get descricao() {
    return this.props.descricao;
  }

  get status() {
    return this.props.status;
  }

  get prioridade() {
    return this.props.prioridade;
  }

  get dataVencimento() {
    return this.props.dataVencimento;
  }

  get clienteId() {
    return this.props.clienteId;
  }

  get usuarioId() {
    return this.props.usuarioId;
  }

  get dataConclusao() {
    return this.props.dataConclusao;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set titulo(titulo: string) {
    this.props.titulo = titulo;
    this.touch();
  }

  set descricao(descricao: string | undefined) {
    this.props.descricao = descricao;
    this.touch();
  }

  set status(status: StatusTarefa) {
    this.props.status = status;
    this.touch();
  }

  set prioridade(prioridade: PrioridadeTarefa) {
    this.props.prioridade = prioridade;
    this.touch();
  }

  set dataVencimento(dataVencimento: Date) {
    this.props.dataVencimento = dataVencimento;
    this.touch();
  }

  set dataConclusao(dataConclusao: Date | undefined) {
    this.props.dataConclusao = dataConclusao;
    this.touch();
  }

  marcarComoConcluida() {
    this.props.status = 'CONCLUIDA';
    this.props.dataConclusao = new Date();
    this.touch();
  }

  verificarSeAtrasada() {
    if (this.props.status !== 'CONCLUIDA') {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const vencimento = new Date(this.props.dataVencimento);
      vencimento.setHours(0, 0, 0, 0);

      if (vencimento < hoje) {
        this.props.status = 'ATRASADA';
      }
    }
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: TarefaProps, id?: UniqueEntityID) {
    const tarefa = new Tarefa(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    // Verifica se está atrasada ao criar
    tarefa.verificarSeAtrasada();

    return tarefa;
  }
}
