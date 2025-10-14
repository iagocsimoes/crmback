import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTarefaUseCase } from '@/domain/application/use-cases/tarefa/create-tarefa';
import { ListTarefasUseCase } from '@/domain/application/use-cases/tarefa/list-tarefas';
import { UpdateTarefaUseCase } from '@/domain/application/use-cases/tarefa/update-tarefa';
import { CompleteTarefaUseCase } from '@/domain/application/use-cases/tarefa/complete-tarefa';
import { DeleteTarefaUseCase } from '@/domain/application/use-cases/tarefa/delete-tarefa';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserPayload } from '../auth/current-user.decorator';
import { PrioridadeTarefa } from '@/domain/enterprise/entities/tarefa';

class CreateTarefaDto {
  titulo: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  dataVencimento: string; // ISO string
  clienteId?: string;
}

class UpdateTarefaDto {
  titulo?: string;
  descricao?: string;
  prioridade?: PrioridadeTarefa;
  dataVencimento?: string; // ISO string
}

@Controller('tarefas')
export class TarefaController {
  constructor(
    private createTarefa: CreateTarefaUseCase,
    private listTarefas: ListTarefasUseCase,
    private updateTarefa: UpdateTarefaUseCase,
    private completeTarefa: CompleteTarefaUseCase,
    private deleteTarefa: DeleteTarefaUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateTarefaDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const { tarefa } = await this.createTarefa.execute({
      titulo: body.titulo,
      descricao: body.descricao,
      prioridade: body.prioridade,
      dataVencimento: new Date(body.dataVencimento),
      clienteId: body.clienteId,
      usuarioId: user.userId,
    });

    return {
      id: tarefa.id.toString(),
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      prioridade: tarefa.prioridade,
      dataVencimento: tarefa.dataVencimento,
      clienteId: tarefa.clienteId?.toString(),
      usuarioId: tarefa.usuarioId.toString(),
      dataConclusao: tarefa.dataConclusao,
      createdAt: tarefa.createdAt,
    };
  }

  @Get()
  async list(
    @Query('usuarioId') usuarioId?: string,
    @Query('clienteId') clienteId?: string,
  ) {
    const { tarefas } = await this.listTarefas.execute({
      usuarioId,
      clienteId,
    });

    return {
      tarefas: tarefas.map((tarefa) => ({
        id: tarefa.id.toString(),
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        status: tarefa.status,
        prioridade: tarefa.prioridade,
        dataVencimento: tarefa.dataVencimento,
        clienteId: tarefa.clienteId?.toString(),
        usuarioId: tarefa.usuarioId.toString(),
        dataConclusao: tarefa.dataConclusao,
        createdAt: tarefa.createdAt,
      })),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTarefaDto) {
    const { tarefa } = await this.updateTarefa.execute({
      tarefaId: id,
      titulo: body.titulo,
      descricao: body.descricao,
      prioridade: body.prioridade,
      dataVencimento: body.dataVencimento
        ? new Date(body.dataVencimento)
        : undefined,
    });

    return {
      id: tarefa.id.toString(),
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      prioridade: tarefa.prioridade,
      dataVencimento: tarefa.dataVencimento,
      clienteId: tarefa.clienteId?.toString(),
      usuarioId: tarefa.usuarioId.toString(),
      dataConclusao: tarefa.dataConclusao,
      updatedAt: tarefa.updatedAt,
    };
  }

  @Patch(':id/concluir')
  async complete(@Param('id') id: string) {
    const { tarefa } = await this.completeTarefa.execute({
      tarefaId: id,
    });

    return {
      id: tarefa.id.toString(),
      titulo: tarefa.titulo,
      status: tarefa.status,
      dataConclusao: tarefa.dataConclusao,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteTarefa.execute({
      tarefaId: id,
    });
  }
}
