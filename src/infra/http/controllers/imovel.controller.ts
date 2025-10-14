import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { CreateImovelUseCase } from '@/domain/application/use-cases/imovel/create-imovel';
import { UpdateImovelUseCase } from '@/domain/application/use-cases/imovel/update-imovel';
import { ImovelRepository } from '@/domain/application/repositories/imovel-repository';
import { CreateImovelDto } from '../dtos/create-imovel.dto';
import { UpdateImovelDto } from '../dtos/update-imovel.dto';

@Controller('imoveis')
export class ImovelController {
  constructor(
    private createImovelUseCase: CreateImovelUseCase,
    private updateImovelUseCase: UpdateImovelUseCase,
    private imovelRepository: ImovelRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateImovelDto) {
    const { imovel } = await this.createImovelUseCase.execute(body);

    return {
      id: imovel.id.toString(),
      identificacao: imovel.identificacao,
      status: imovel.status,
      vgv: imovel.vgv,
      descricao: imovel.descricao,
      tipo: imovel.tipo,
      metragem: imovel.metragem,
      quartos: imovel.quartos,
      vagas: imovel.vagas,
      createdAt: imovel.createdAt,
    };
  }

  @Get()
  async findAll() {
    const imoveis = await this.imovelRepository.findAll();

    return imoveis.map((imovel) => ({
      id: imovel.id.toString(),
      identificacao: imovel.identificacao,
      status: imovel.status,
      vgv: imovel.vgv,
      descricao: imovel.descricao,
      tipo: imovel.tipo,
      metragem: imovel.metragem,
      quartos: imovel.quartos,
      vagas: imovel.vagas,
      createdAt: imovel.createdAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const imovel = await this.imovelRepository.findById(id);

    if (!imovel) {
      return { error: 'Imóvel não encontrado' };
    }

    return {
      id: imovel.id.toString(),
      identificacao: imovel.identificacao,
      status: imovel.status,
      vgv: imovel.vgv,
      descricao: imovel.descricao,
      tipo: imovel.tipo,
      metragem: imovel.metragem,
      quartos: imovel.quartos,
      vagas: imovel.vagas,
      createdAt: imovel.createdAt,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateImovelDto) {
    const { imovel } = await this.updateImovelUseCase.execute({
      id,
      ...body,
    });

    return {
      id: imovel.id.toString(),
      identificacao: imovel.identificacao,
      status: imovel.status,
      vgv: imovel.vgv,
      descricao: imovel.descricao,
      tipo: imovel.tipo,
      metragem: imovel.metragem,
      quartos: imovel.quartos,
      vagas: imovel.vagas,
      updatedAt: imovel.updatedAt,
    };
  }
}
