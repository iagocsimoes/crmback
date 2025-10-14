import { CreateImovelUseCase } from '@/domain/application/use-cases/imovel/create-imovel';
import { UpdateImovelUseCase } from '@/domain/application/use-cases/imovel/update-imovel';
import { ImovelRepository } from '@/domain/application/repositories/imovel-repository';
import { CreateImovelDto } from '../dtos/create-imovel.dto';
import { UpdateImovelDto } from '../dtos/update-imovel.dto';
export declare class ImovelController {
    private createImovelUseCase;
    private updateImovelUseCase;
    private imovelRepository;
    constructor(createImovelUseCase: CreateImovelUseCase, updateImovelUseCase: UpdateImovelUseCase, imovelRepository: ImovelRepository);
    create(body: CreateImovelDto): Promise<{
        id: string;
        identificacao: string;
        status: "DISPONIVEL" | "PRE_RESERVA" | "VENDIDO" | "BLOQUEADO";
        vgv: number;
        descricao: string | undefined;
        tipo: string | undefined;
        metragem: number | undefined;
        quartos: number | undefined;
        vagas: number | undefined;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        identificacao: string;
        status: "DISPONIVEL" | "PRE_RESERVA" | "VENDIDO" | "BLOQUEADO";
        vgv: number;
        descricao: string | undefined;
        tipo: string | undefined;
        metragem: number | undefined;
        quartos: number | undefined;
        vagas: number | undefined;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        error: string;
        id?: undefined;
        identificacao?: undefined;
        status?: undefined;
        vgv?: undefined;
        descricao?: undefined;
        tipo?: undefined;
        metragem?: undefined;
        quartos?: undefined;
        vagas?: undefined;
        createdAt?: undefined;
    } | {
        id: string;
        identificacao: string;
        status: "DISPONIVEL" | "PRE_RESERVA" | "VENDIDO" | "BLOQUEADO";
        vgv: number;
        descricao: string | undefined;
        tipo: string | undefined;
        metragem: number | undefined;
        quartos: number | undefined;
        vagas: number | undefined;
        createdAt: Date;
        error?: undefined;
    }>;
    update(id: string, body: UpdateImovelDto): Promise<{
        id: string;
        identificacao: string;
        status: "DISPONIVEL" | "PRE_RESERVA" | "VENDIDO" | "BLOQUEADO";
        vgv: number;
        descricao: string | undefined;
        tipo: string | undefined;
        metragem: number | undefined;
        quartos: number | undefined;
        vagas: number | undefined;
        updatedAt: Date | undefined;
    }>;
}
