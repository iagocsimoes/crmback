import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateEstagioUseCase } from '@/domain/application/use-cases/estagio/create-estagio';
import { EstagioRepository } from '@/domain/application/repositories/estagio-repository';
import { CreateEstagioDto } from '../dtos/create-estagio.dto';

@Controller('estagios')
export class EstagioController {
  constructor(
    private createEstagioUseCase: CreateEstagioUseCase,
    private estagioRepository: EstagioRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateEstagioDto) {
    const { estagio } = await this.createEstagioUseCase.execute(body);

    return {
      id: estagio.id.toString(),
      nome: estagio.nome,
      ordem: estagio.ordem,
      cor: estagio.cor,
      createdAt: estagio.createdAt,
    };
  }

  @Get()
  async findAll() {
    const estagios = await this.estagioRepository.findAll();

    return estagios.map((estagio) => ({
      id: estagio.id.toString(),
      nome: estagio.nome,
      ordem: estagio.ordem,
      cor: estagio.cor,
      createdAt: estagio.createdAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const estagio = await this.estagioRepository.findById(id);

    if (!estagio) {
      return { error: 'Estágio não encontrado' };
    }

    return {
      id: estagio.id.toString(),
      nome: estagio.nome,
      ordem: estagio.ordem,
      cor: estagio.cor,
      createdAt: estagio.createdAt,
    };
  }
}
