import { Injectable } from '@nestjs/common';
import {
  NegociacaoRepository,
  NegociacaoComDetalhes,
} from '@/domain/application/repositories/negociacao-repository';
import { Negociacao } from '@/domain/enterprise/entities/negociacao';
import { PrismaService } from '../prisma.service';
import { PrismaNegociacaoMapper } from '../mappers/prisma-negociacao-mapper';

@Injectable()
export class PrismaNegociacaoRepository implements NegociacaoRepository {
  constructor(private prisma: PrismaService) {}

  async create(negociacao: Negociacao): Promise<void> {
    const data = PrismaNegociacaoMapper.toPrisma(negociacao);
    await this.prisma.negociacao.create({ data });
  }

  async findById(id: string): Promise<Negociacao | null> {
    const negociacao = await this.prisma.negociacao.findUnique({
      where: { id },
    });

    if (!negociacao) {
      return null;
    }

    return PrismaNegociacaoMapper.toDomain(negociacao);
  }

  async findAll(): Promise<Negociacao[]> {
    const negociacoes = await this.prisma.negociacao.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return negociacoes.map(PrismaNegociacaoMapper.toDomain);
  }

  async findByClienteId(clienteId: string): Promise<Negociacao[]> {
    const negociacoes = await this.prisma.negociacao.findMany({
      where: { clienteId },
      orderBy: { createdAt: 'desc' },
    });

    return negociacoes.map(PrismaNegociacaoMapper.toDomain);
  }

  async findByImovelId(imovelId: string): Promise<Negociacao[]> {
    const negociacoes = await this.prisma.negociacao.findMany({
      where: { imovelId },
      orderBy: { createdAt: 'desc' },
    });

    return negociacoes.map(PrismaNegociacaoMapper.toDomain);
  }

  async findByEstagioId(estagioId: string): Promise<Negociacao[]> {
    const negociacoes = await this.prisma.negociacao.findMany({
      where: { estagioId },
      orderBy: { createdAt: 'desc' },
    });

    return negociacoes.map(PrismaNegociacaoMapper.toDomain);
  }

  async findAllComDetalhes(): Promise<NegociacaoComDetalhes[]> {
    const negociacoes = await this.prisma.negociacao.findMany({
      include: {
        cliente: true,
        imovel: true,
        estagio: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return negociacoes.map((n) => ({
      negociacao: PrismaNegociacaoMapper.toDomain(n),
      clienteNome: n.cliente.nome,
      clienteEmail: n.cliente.email,
      clienteTelefone: n.cliente.telefone,
      clienteCpfCnpj: n.cliente.cpfCnpj,
      imovelIdentificacao: n.imovel.identificacao,
      imovelTipo: n.imovel.tipo,
      imovelEndereco: n.imovel.endereco,
      imovelValor: n.imovel.valor,
      imovelMetragem: n.imovel.metragem,
      imovelQuartos: n.imovel.quartos,
      imovelVagas: n.imovel.vagas,
      estagioNome: n.estagio.nome,
    }));
  }

  async save(negociacao: Negociacao): Promise<void> {
    const data = PrismaNegociacaoMapper.toPrisma(negociacao);
    await this.prisma.negociacao.update({
      where: { id: negociacao.id.toString() },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.negociacao.delete({
      where: { id },
    });
  }
}
