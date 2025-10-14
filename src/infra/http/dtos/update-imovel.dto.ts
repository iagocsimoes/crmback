export class UpdateImovelDto {
  identificacao?: string;
  vgv?: number;
  status?: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO';
  descricao?: string;
  tipo?: string;
  metragem?: number;
  quartos?: number;
  vagas?: number;
}
