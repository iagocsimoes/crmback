import { CreateClienteUseCase } from '@/domain/application/use-cases/cliente/create-cliente';
import { UpdateClienteUseCase } from '@/domain/application/use-cases/cliente/update-cliente';
import { ClienteRepository } from '@/domain/application/repositories/cliente-repository';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';
export declare class ClienteController {
    private createClienteUseCase;
    private updateClienteUseCase;
    private clienteRepository;
    constructor(createClienteUseCase: CreateClienteUseCase, updateClienteUseCase: UpdateClienteUseCase, clienteRepository: ClienteRepository);
    create(body: CreateClienteDto): Promise<{
        id: string;
        nome: string;
        telefone: string;
        email: string | undefined;
        endereco: string | undefined;
        formaPagamento: "AVISTA" | "FINANCIADO" | "PARCELADO" | undefined;
        origemLead: string | undefined;
        cpfCnpj: string | undefined;
        observacoes: string | undefined;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        nome: string;
        telefone: string;
        email: string | undefined;
        endereco: string | undefined;
        formaPagamento: "AVISTA" | "FINANCIADO" | "PARCELADO" | undefined;
        origemLead: string | undefined;
        cpfCnpj: string | undefined;
        observacoes: string | undefined;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        error: string;
        id?: undefined;
        nome?: undefined;
        telefone?: undefined;
        email?: undefined;
        endereco?: undefined;
        formaPagamento?: undefined;
        origemLead?: undefined;
        cpfCnpj?: undefined;
        observacoes?: undefined;
        createdAt?: undefined;
    } | {
        id: string;
        nome: string;
        telefone: string;
        email: string | undefined;
        endereco: string | undefined;
        formaPagamento: "AVISTA" | "FINANCIADO" | "PARCELADO" | undefined;
        origemLead: string | undefined;
        cpfCnpj: string | undefined;
        observacoes: string | undefined;
        createdAt: Date;
        error?: undefined;
    }>;
    update(id: string, body: UpdateClienteDto): Promise<{
        id: string;
        nome: string;
        telefone: string;
        email: string | undefined;
        endereco: string | undefined;
        formaPagamento: "AVISTA" | "FINANCIADO" | "PARCELADO" | undefined;
        origemLead: string | undefined;
        cpfCnpj: string | undefined;
        observacoes: string | undefined;
        updatedAt: Date | undefined;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
