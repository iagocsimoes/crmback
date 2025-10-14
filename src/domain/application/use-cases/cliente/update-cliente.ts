import { Injectable } from '@nestjs/common';
import { Cliente } from '@/domain/enterprise/entities/cliente';
import { ClienteRepository } from '../../repositories/cliente-repository';

interface UpdateClienteUseCaseRequest {
  id: string;
  nome?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  formaPagamento?: 'AVISTA' | 'FINANCIADO' | 'PARCELADO';
  origemLead?: string;
  cpfCnpj?: string;
  observacoes?: string;
}

interface UpdateClienteUseCaseResponse {
  cliente: Cliente;
}

@Injectable()
export class UpdateClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(
    request: UpdateClienteUseCaseRequest,
  ): Promise<UpdateClienteUseCaseResponse> {
    const cliente = await this.clienteRepository.findById(request.id);

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    if (request.nome !== undefined) {
      cliente.nome = request.nome;
    }
    if (request.telefone !== undefined) {
      cliente.telefone = request.telefone;
    }
    if (request.email !== undefined) {
      cliente.email = request.email;
    }
    if (request.endereco !== undefined) {
      cliente.endereco = request.endereco;
    }
    if (request.formaPagamento !== undefined) {
      cliente.formaPagamento = request.formaPagamento;
    }
    if (request.origemLead !== undefined) {
      cliente.origemLead = request.origemLead;
    }
    if (request.cpfCnpj !== undefined) {
      cliente.cpfCnpj = request.cpfCnpj;
    }
    if (request.observacoes !== undefined) {
      cliente.observacoes = request.observacoes;
    }

    await this.clienteRepository.save(cliente);

    return { cliente };
  }
}
