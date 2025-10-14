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
export declare class UpdateClienteUseCase {
    private clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    execute(request: UpdateClienteUseCaseRequest): Promise<UpdateClienteUseCaseResponse>;
}
export {};
