import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { ClienteController } from './controllers/cliente.controller';
import { ImovelController } from './controllers/imovel.controller';
import { EstagioController } from './controllers/estagio.controller';
import { NegociacaoController } from './controllers/negociacao.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { AuthController } from './controllers/auth.controller';
import { ReportsController } from './controllers/reports.controller';
import { AtividadeController } from './controllers/atividade.controller';
import { TarefaController } from './controllers/tarefa.controller';
import { CreateClienteUseCase } from '@/domain/application/use-cases/cliente/create-cliente';
import { UpdateClienteUseCase } from '@/domain/application/use-cases/cliente/update-cliente';
import { CreateImovelUseCase } from '@/domain/application/use-cases/imovel/create-imovel';
import { UpdateImovelUseCase } from '@/domain/application/use-cases/imovel/update-imovel';
import { CreateEstagioUseCase } from '@/domain/application/use-cases/estagio/create-estagio';
import { CreateNegociacaoUseCase } from '@/domain/application/use-cases/negociacao/create-negociacao';
import { MoveNegociacaoEstagioUseCase } from '@/domain/application/use-cases/negociacao/move-negociacao-estagio';
import { GetDashboardMetricsUseCase } from '@/domain/application/use-cases/dashboard/get-dashboard-metrics';
import { RegisterUserUseCase } from '@/domain/application/use-cases/auth/register-user';
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/auth/authenticate-user';
import { GetSalesReportUseCase } from '@/domain/application/use-cases/reports/get-sales-report';
import { CreateAtividadeUseCase } from '@/domain/application/use-cases/atividade/create-atividade';
import { ListAtividadesUseCase } from '@/domain/application/use-cases/atividade/list-atividades';
import { CreateTarefaUseCase } from '@/domain/application/use-cases/tarefa/create-tarefa';
import { ListTarefasUseCase } from '@/domain/application/use-cases/tarefa/list-tarefas';
import { UpdateTarefaUseCase } from '@/domain/application/use-cases/tarefa/update-tarefa';
import { CompleteTarefaUseCase } from '@/domain/application/use-cases/tarefa/complete-tarefa';
import { DeleteTarefaUseCase } from '@/domain/application/use-cases/tarefa/delete-tarefa';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [DatabaseModule, CryptographyModule, PassportModule],
  controllers: [
    ClienteController,
    ImovelController,
    EstagioController,
    NegociacaoController,
    DashboardController,
    AuthController,
    ReportsController,
    AtividadeController,
    TarefaController,
  ],
  providers: [
    CreateClienteUseCase,
    UpdateClienteUseCase,
    CreateImovelUseCase,
    UpdateImovelUseCase,
    CreateEstagioUseCase,
    CreateNegociacaoUseCase,
    MoveNegociacaoEstagioUseCase,
    GetDashboardMetricsUseCase,
    GetSalesReportUseCase,
    CreateAtividadeUseCase,
    ListAtividadesUseCase,
    CreateTarefaUseCase,
    ListTarefasUseCase,
    UpdateTarefaUseCase,
    CompleteTarefaUseCase,
    DeleteTarefaUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class HttpModule {}

