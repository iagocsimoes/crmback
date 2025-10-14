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
export declare class CreateClienteUseCase {
    private clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    execute(request: CreateClienteUseCaseRequest): Promise<CreateClienteUseCaseResponse>;
}
export {};
