export class CreateNegociacaoDto {
  clienteId: string;
  imovelId: string;
  estagioId: string;
  valor?: number;
  observacoes?: string;
}
