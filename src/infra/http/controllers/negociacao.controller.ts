import { Body, Controller, Get, Post, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateNegociacaoUseCase } from '@/domain/application/use-cases/negociacao/create-negociacao';
import { MoveNegociacaoEstagioUseCase } from '@/domain/application/use-cases/negociacao/move-negociacao-estagio';
import { DeleteNegociacaoUseCase } from '@/domain/application/use-cases/negociacao/delete-negociacao';
import { NegociacaoRepository } from '@/domain/application/repositories/negociacao-repository';
import { CreateNegociacaoDto } from '../dtos/create-negociacao.dto';
import { MoveNegociacaoDto } from '../dtos/move-negociacao.dto';

@Controller('negociacoes')
export class NegociacaoController {
  constructor(
    private createNegociacaoUseCase: CreateNegociacaoUseCase,
    private moveNegociacaoEstagioUseCase: MoveNegociacaoEstagioUseCase,
    private deleteNegociacaoUseCase: DeleteNegociacaoUseCase,
    private negociacaoRepository: NegociacaoRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateNegociacaoDto) {
    const { negociacao } = await this.createNegociacaoUseCase.execute(body);

    return {
      id: negociacao.id.toString(),
      clienteId: negociacao.clienteId.toString(),
      imovelId: negociacao.imovelId.toString(),
      estagioId: negociacao.estagioId.toString(),
      valor: negociacao.valor,
      observacoes: negociacao.observacoes,
      canalVenda: negociacao.canalVenda,
      createdAt: negociacao.createdAt,
    };
  }

  @Get()
  async findAll() {
    const negociacoes = await this.negociacaoRepository.findAllComDetalhes();

    return negociacoes.map((item) => ({
      id: item.negociacao.id.toString(),
      clienteId: item.negociacao.clienteId.toString(),
      cliente: {
        id: item.negociacao.clienteId.toString(),
        nome: item.clienteNome,
        email: item.clienteEmail,
        telefone: item.clienteTelefone,
        cpfCnpj: item.clienteCpfCnpj,
      },
      imovelId: item.negociacao.imovelId.toString(),
      imovel: {
        id: item.negociacao.imovelId.toString(),
        identificacao: item.imovelIdentificacao,
        tipo: item.imovelTipo,
        endereco: item.imovelEndereco,
        valor: item.imovelValor,
        metragem: item.imovelMetragem,
        quartos: item.imovelQuartos,
        vagas: item.imovelVagas,
      },
      estagioId: item.negociacao.estagioId.toString(),
      estagio: {
        id: item.negociacao.estagioId.toString(),
        nome: item.estagioNome,
      },
      valor: item.negociacao.valor,
      formaPagamento: item.negociacao.formaPagamento,
      valorEntrada: item.negociacao.valorEntrada,
      numeroParcelas: item.negociacao.numeroParcelas,
      contratoAssinado: item.negociacao.contratoAssinado,
      dataAssinatura: item.negociacao.dataAssinatura,
      dataVencimento: item.negociacao.dataVencimento,
      observacoes: item.negociacao.observacoes,
      canalVenda: item.negociacao.canalVenda,
      createdAt: item.negociacao.createdAt,
      updatedAt: item.negociacao.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const negociacao = await this.negociacaoRepository.findById(id);

    if (!negociacao) {
      return { error: 'Negociação não encontrada' };
    }

    return {
      id: negociacao.id.toString(),
      clienteId: negociacao.clienteId.toString(),
      imovelId: negociacao.imovelId.toString(),
      estagioId: negociacao.estagioId.toString(),
      valor: negociacao.valor,
      observacoes: negociacao.observacoes,
      canalVenda: negociacao.canalVenda,
      createdAt: negociacao.createdAt,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const negociacao = await this.negociacaoRepository.findById(id);

    if (!negociacao) {
      return { error: 'Negociação não encontrada' };
    }

    // Update properties
    if (body.valor !== undefined) negociacao.valor = body.valor;
    if (body.formaPagamento !== undefined) negociacao.formaPagamento = body.formaPagamento;
    if (body.valorEntrada !== undefined) negociacao.valorEntrada = body.valorEntrada;
    if (body.numeroParcelas !== undefined) negociacao.numeroParcelas = body.numeroParcelas;
    if (body.contratoAssinado !== undefined) negociacao.contratoAssinado = body.contratoAssinado;
    if (body.dataAssinatura !== undefined) negociacao.dataAssinatura = body.dataAssinatura;
    if (body.dataVencimento !== undefined) negociacao.dataVencimento = body.dataVencimento;
    if (body.observacoes !== undefined) negociacao.observacoes = body.observacoes;
    if (body.canalVenda !== undefined) negociacao.canalVenda = body.canalVenda;

    await this.negociacaoRepository.save(negociacao);

    return { success: true };
  }

  @Patch(':id/mover')
  async moverEstagio(
    @Param('id') id: string,
    @Body() body: MoveNegociacaoDto,
  ) {
    await this.moveNegociacaoEstagioUseCase.execute({
      negociacaoId: id,
      novoEstagioId: body.novoEstagioId,
    });

    return { success: true };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteNegociacaoUseCase.execute({
      negociacaoId: id,
    });
  }
}
