import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export type UserRole = 'ADMIN' | 'VENDEDOR' | 'GERENTE';
export interface UserProps {
    nome: string;
    email: string;
    senha: string;
    role: UserRole;
    ativo: boolean;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class User extends Entity<UserProps> {
    get nome(): string;
    set nome(nome: string);
    get email(): string;
    set email(email: string);
    get senha(): string;
    set senha(senha: string);
    get role(): UserRole;
    set role(role: UserRole);
    get ativo(): boolean;
    set ativo(ativo: boolean);
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    private touch;
    static create(props: Omit<UserProps, 'createdAt' | 'ativo'> & {
        ativo?: boolean;
    }, id?: UniqueEntityID): User;
}
