import { CreateNegociacaoUseCase } from '@/domain/application/use-cases/negociacao/create-negociacao';
import { MoveNegociacaoEstagioUseCase } from '@/domain/application/use-cases/negociacao/move-negociacao-estagio';
import { DeleteNegociacaoUseCase } from '@/domain/application/use-cases/negociacao/delete-negociacao';
import { NegociacaoRepository } from '@/domain/application/repositories/negociacao-repository';
import { CreateNegociacaoDto } from '../dtos/create-negociacao.dto';
import { MoveNegociacaoDto } from '../dtos/move-negociacao.dto';
export declare class NegociacaoController {
    private createNegociacaoUseCase;
    private moveNegociacaoEstagioUseCase;
    private deleteNegociacaoUseCase;
    private negociacaoRepository;
    constructor(createNegociacaoUseCase: CreateNegociacaoUseCase, moveNegociacaoEstagioUseCase: MoveNegociacaoEstagioUseCase, deleteNegociacaoUseCase: DeleteNegociacaoUseCase, negociacaoRepository: NegociacaoRepository);
    create(body: CreateNegociacaoDto): Promise<{
        id: string;
        clienteId: string;
        imovelId: string;
        estagioId: string;
        valor: number | undefined;
        observacoes: string | undefined;
        canalVenda: string | undefined;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        clienteId: string;
        cliente: {
            id: string;
            nome: string;
            email: string | null;
            telefone: string;
            cpfCnpj: string | null;
        };
        imovelId: string;
        imovel: {
            id: string;
            identificacao: string;
            tipo: string | null;
            endereco: string | null;
            valor: number | null;
            metragem: number | null;
            quartos: number | null;
            vagas: number | null;
        };
        estagioId: string;
        estagio: {
            id: string;
            nome: string;
        };
        valor: number | undefined;
        formaPagamento: string | undefined;
        valorEntrada: number | undefined;
        numeroParcelas: number | undefined;
        contratoAssinado: boolean;
        dataAssinatura: string | Date | undefined;
        dataVencimento: string | Date | undefined;
        observacoes: string | undefined;
        canalVenda: string | undefined;
        createdAt: Date;
        updatedAt: Date | undefined;
    }[]>;
    findOne(id: string): Promise<{
        error: string;
        id?: undefined;
        clienteId?: undefined;
        imovelId?: undefined;
        estagioId?: undefined;
        valor?: undefined;
        observacoes?: undefined;
        canalVenda?: undefined;
        createdAt?: undefined;
    } | {
        id: string;
        clienteId: string;
        imovelId: string;
        estagioId: string;
        valor: number | undefined;
        observacoes: string | undefined;
        canalVenda: string | undefined;
        createdAt: Date;
        error?: undefined;
    }>;
    update(id: string, body: any): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
    }>;
    moverEstagio(id: string, body: MoveNegociacaoDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<void>;
}
