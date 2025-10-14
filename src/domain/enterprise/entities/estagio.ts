import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface EstagioProps {
  nome: string; // Ex: Contato, Proposta, Negociação, Ganho, Perdido
  ordem: number; // Para ordenar os estágios no pipeline
  cor?: string; // Para exibição visual (ex: #FF5733)
  createdAt: Date;
  updatedAt?: Date;
}

export class Estagio extends Entity<EstagioProps> {
  get nome() {
    return this.props.nome;
  }

  set nome(nome: string) {
    this.props.nome = nome;
    this.touch();
  }

  get ordem() {
    return this.props.ordem;
  }

  set ordem(ordem: number) {
    this.props.ordem = ordem;
    this.touch();
  }

  get cor() {
    return this.props.cor;
  }

  set cor(cor: string | undefined) {
    this.props.cor = cor;
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

  static create(props: Omit<EstagioProps, 'createdAt'>, id?: UniqueEntityID) {
    const estagio = new Estagio(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return estagio;
  }
}
