import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export type UserRole = 'ADMIN' | 'VENDEDOR' | 'GERENTE';

export interface UserProps {
  nome: string;
  email: string;
  senha: string; // Hash da senha
  role: UserRole;
  ativo: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  get nome() {
    return this.props.nome;
  }

  set nome(nome: string) {
    this.props.nome = nome;
    this.touch();
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get senha() {
    return this.props.senha;
  }

  set senha(senha: string) {
    this.props.senha = senha;
    this.touch();
  }

  get role() {
    return this.props.role;
  }

  set role(role: UserRole) {
    this.props.role = role;
    this.touch();
  }

  get ativo() {
    return this.props.ativo;
  }

  set ativo(ativo: boolean) {
    this.props.ativo = ativo;
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

  static create(props: Omit<UserProps, 'createdAt' | 'ativo'> & { ativo?: boolean }, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        ativo: props.ativo ?? true,
        createdAt: new Date(),
      },
      id,
    );

    return user;
  }
}
