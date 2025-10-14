import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface ImovelProps {
    identificacao: string;
    status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO';
    vgv: number;
    valor?: number;
    endereco?: string;
    descricao?: string;
    tipo?: string;
    metragem?: number;
    quartos?: number;
    vagas?: number;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class Imovel extends Entity<ImovelProps> {
    get identificacao(): string;
    set identificacao(identificacao: string);
    get status(): "DISPONIVEL" | "PRE_RESERVA" | "VENDIDO" | "BLOQUEADO";
    set status(status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO');
    get vgv(): number;
    set vgv(vgv: number);
    get valor(): number | undefined;
    set valor(valor: number | undefined);
    get endereco(): string | undefined;
    set endereco(endereco: string | undefined);
    get descricao(): string | undefined;
    set descricao(descricao: string | undefined);
    get tipo(): string | undefined;
    set tipo(tipo: string | undefined);
    get metragem(): number | undefined;
    set metragem(metragem: number | undefined);
    get quartos(): number | undefined;
    set quartos(quartos: number | undefined);
    get vagas(): number | undefined;
    set vagas(vagas: number | undefined);
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
    private touch;
    static create(props: Omit<ImovelProps, 'createdAt'>, id?: UniqueEntityID): Imovel;
}
