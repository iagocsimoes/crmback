import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export type TipoAtividade = 'LIGACAO' | 'EMAIL' | 'REUNIAO' | 'VISITA' | 'WHATSAPP' | 'OUTRO';
export interface AtividadeProps {
    clienteId: UniqueEntityID;
    usuarioId: UniqueEntityID;
    tipo: TipoAtividade;
    descricao: string;
    data: Date;
    duracao?: number;
    observacoes?: string;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Atividade extends Entity<AtividadeProps> {
    get clienteId(): UniqueEntityID;
    get usuarioId(): UniqueEntityID;
    get tipo(): TipoAtividade;
    get descricao(): string;
    get data(): Date;
    get duracao(): number | undefined;
    get observacoes(): string | undefined;
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    set tipo(tipo: TipoAtividade);
    set descricao(descricao: string);
    set data(data: Date);
    set duracao(duracao: number | undefined);
    set observacoes(observacoes: string | undefined);
    private touch;
    static create(props: AtividadeProps, id?: UniqueEntityID): Atividade;
}
