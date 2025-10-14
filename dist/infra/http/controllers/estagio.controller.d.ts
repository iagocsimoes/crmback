import { CreateEstagioUseCase } from '@/domain/application/use-cases/estagio/create-estagio';
import { EstagioRepository } from '@/domain/application/repositories/estagio-repository';
import { CreateEstagioDto } from '../dtos/create-estagio.dto';
export declare class EstagioController {
    private createEstagioUseCase;
    private estagioRepository;
    constructor(createEstagioUseCase: CreateEstagioUseCase, estagioRepository: EstagioRepository);
    create(body: CreateEstagioDto): Promise<{
        id: string;
        nome: string;
        ordem: number;
        cor: string | undefined;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        nome: string;
        ordem: number;
        cor: string | undefined;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        error: string;
        id?: undefined;
        nome?: undefined;
        ordem?: undefined;
        cor?: undefined;
        createdAt?: undefined;
    } | {
        id: string;
        nome: string;
        ordem: number;
        cor: string | undefined;
        createdAt: Date;
        error?: undefined;
    }>;
}
