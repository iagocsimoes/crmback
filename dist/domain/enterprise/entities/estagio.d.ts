import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface EstagioProps {
    nome: string;
    ordem: number;
    cor?: string;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Estagio extends Entity<EstagioProps> {
    get nome(): string;
    set nome(nome: string);
    get ordem(): number;
    set ordem(ordem: number);
    get cor(): string | undefined;
    set cor(cor: string | undefined);
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    private touch;
    static create(props: Omit<EstagioProps, 'createdAt'>, id?: UniqueEntityID): Estagio;
}
