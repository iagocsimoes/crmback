import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateAtividadeUseCase } from '@/domain/application/use-cases/atividade/create-atividade';
import { ListAtividadesUseCase } from '@/domain/application/use-cases/atividade/list-atividades';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserPayload } from '../auth/current-user.decorator';
import { TipoAtividade } from '@/domain/enterprise/entities/atividade';

class CreateAtividadeDto {
  clienteId: string;
  tipo: TipoAtividade;
  descricao: string;
  data: string; // ISO string
  duracao?: number;
  observacoes?: string;
}

@Controller('atividades')
export class AtividadeController {
  constructor(
    private createAtividade: CreateAtividadeUseCase,
    private listAtividades: ListAtividadesUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateAtividadeDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const { atividade } = await this.createAtividade.execute({
      clienteId: body.clienteId,
      usuarioId: user.userId,
      tipo: body.tipo,
      descricao: body.descricao,
      data: new Date(body.data),
      duracao: body.duracao,
      observacoes: body.observacoes,
    });

    return {
      id: atividade.id.toString(),
      clienteId: atividade.clienteId.toString(),
      usuarioId: atividade.usuarioId.toString(),
      tipo: atividade.tipo,
      descricao: atividade.descricao,
      data: atividade.data,
      duracao: atividade.duracao,
      observacoes: atividade.observacoes,
      createdAt: atividade.createdAt,
    };
  }

  @Get()
  async list(@Query('clienteId') clienteId?: string) {
    const { atividades } = await this.listAtividades.execute({ clienteId });

    return {
      atividades: atividades.map((atividade) => ({
        id: atividade.id.toString(),
        clienteId: atividade.clienteId.toString(),
        usuarioId: atividade.usuarioId.toString(),
        tipo: atividade.tipo,
        descricao: atividade.descricao,
        data: atividade.data,
        duracao: atividade.duracao,
        observacoes: atividade.observacoes,
        createdAt: atividade.createdAt,
      })),
    };
  }
}
