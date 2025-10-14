import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { CreateClienteUseCase } from '@/domain/application/use-cases/cliente/create-cliente';
import { UpdateClienteUseCase } from '@/domain/application/use-cases/cliente/update-cliente';
import { ClienteRepository } from '@/domain/application/repositories/cliente-repository';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(
    private createClienteUseCase: CreateClienteUseCase,
    private updateClienteUseCase: UpdateClienteUseCase,
    private clienteRepository: ClienteRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateClienteDto) {
    const { cliente } = await this.createClienteUseCase.execute(body);

    return {
      id: cliente.id.toString(),
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      endereco: cliente.endereco,
      formaPagamento: cliente.formaPagamento,
      origemLead: cliente.origemLead,
      cpfCnpj: cliente.cpfCnpj,
      observacoes: cliente.observacoes,
      createdAt: cliente.createdAt,
    };
  }

  @Get()
  async findAll() {
    const clientes = await this.clienteRepository.findAll();

    return clientes.map((cliente) => ({
      id: cliente.id.toString(),
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      endereco: cliente.endereco,
      formaPagamento: cliente.formaPagamento,
      origemLead: cliente.origemLead,
      cpfCnpj: cliente.cpfCnpj,
      observacoes: cliente.observacoes,
      createdAt: cliente.createdAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cliente = await this.clienteRepository.findById(id);

    if (!cliente) {
      return { error: 'Cliente não encontrado' };
    }

    return {
      id: cliente.id.toString(),
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      endereco: cliente.endereco,
      formaPagamento: cliente.formaPagamento,
      origemLead: cliente.origemLead,
      cpfCnpj: cliente.cpfCnpj,
      observacoes: cliente.observacoes,
      createdAt: cliente.createdAt,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateClienteDto) {
    const { cliente } = await this.updateClienteUseCase.execute({
      id,
      ...body,
    });

    return {
      id: cliente.id.toString(),
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      endereco: cliente.endereco,
      formaPagamento: cliente.formaPagamento,
      origemLead: cliente.origemLead,
      cpfCnpj: cliente.cpfCnpj,
      observacoes: cliente.observacoes,
      updatedAt: cliente.updatedAt,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.clienteRepository.delete(id);
    return { message: 'Cliente excluído com sucesso' };
  }
}
