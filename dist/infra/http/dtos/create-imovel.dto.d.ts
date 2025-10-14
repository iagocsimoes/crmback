export declare class CreateImovelDto {
    identificacao: string;
    vgv: number;
    status?: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO';
    descricao?: string;
    tipo?: string;
    metragem?: number;
    quartos?: number;
    vagas?: number;
}
