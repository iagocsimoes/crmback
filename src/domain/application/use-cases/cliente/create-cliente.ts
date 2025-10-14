import { Injectable } from '@nestjs/common';
import { Cliente } from '@/domain/enterprise/entities/cliente';
import { ClienteRepository } from '../../repositories/cliente-repository';

interface CreateClienteUseCaseRequest {
  nome: string;
  telefone: string;
  email?: string;
  endereco?: string;
  formaPagamento?: 'AVISTA' | 'FINANCIADO' | 'PARCELADO';
  origemLead?: string;
  cpfCnpj?: string;
  observacoes?: string;
}

interface CreateClienteUseCaseResponse {
  cliente: Cliente;
}

@Injectable()
export class CreateClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(
    request: CreateClienteUseCaseRequest,
  ): Promise<CreateClienteUseCaseResponse> {
    const cliente = Cliente.create({
      nome: request.nome,
      telefone: request.telefone,
      email: request.email,
      endereco: request.endereco,
      formaPagamento: request.formaPagamento,
      origemLead: request.origemLead,
      cpfCnpj: request.cpfCnpj,
      observacoes: request.observacoes,
    });

    await this.clienteRepository.create(cliente);

    return { cliente };
  }
}
