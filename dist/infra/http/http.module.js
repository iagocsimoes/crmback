"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const database_module_1 = require("../database/database.module");
const cryptography_module_1 = require("../cryptography/cryptography.module");
const cliente_controller_1 = require("./controllers/cliente.controller");
const imovel_controller_1 = require("./controllers/imovel.controller");
const estagio_controller_1 = require("./controllers/estagio.controller");
const negociacao_controller_1 = require("./controllers/negociacao.controller");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const auth_controller_1 = require("./controllers/auth.controller");
const reports_controller_1 = require("./controllers/reports.controller");
const atividade_controller_1 = require("./controllers/atividade.controller");
const tarefa_controller_1 = require("./controllers/tarefa.controller");
const create_cliente_1 = require("../../domain/application/use-cases/cliente/create-cliente");
const update_cliente_1 = require("../../domain/application/use-cases/cliente/update-cliente");
const create_imovel_1 = require("../../domain/application/use-cases/imovel/create-imovel");
const update_imovel_1 = require("../../domain/application/use-cases/imovel/update-imovel");
const create_estagio_1 = require("../../domain/application/use-cases/estagio/create-estagio");
const create_negociacao_1 = require("../../domain/application/use-cases/negociacao/create-negociacao");
const move_negociacao_estagio_1 = require("../../domain/application/use-cases/negociacao/move-negociacao-estagio");
const get_dashboard_metrics_1 = require("../../domain/application/use-cases/dashboard/get-dashboard-metrics");
const register_user_1 = require("../../domain/application/use-cases/auth/register-user");
const authenticate_user_1 = require("../../domain/application/use-cases/auth/authenticate-user");
const get_sales_report_1 = require("../../domain/application/use-cases/reports/get-sales-report");
const create_atividade_1 = require("../../domain/application/use-cases/atividade/create-atividade");
const list_atividades_1 = require("../../domain/application/use-cases/atividade/list-atividades");
const create_tarefa_1 = require("../../domain/application/use-cases/tarefa/create-tarefa");
const list_tarefas_1 = require("../../domain/application/use-cases/tarefa/list-tarefas");
const update_tarefa_1 = require("../../domain/application/use-cases/tarefa/update-tarefa");
const complete_tarefa_1 = require("../../domain/application/use-cases/tarefa/complete-tarefa");
const delete_tarefa_1 = require("../../domain/application/use-cases/tarefa/delete-tarefa");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cryptography_module_1.CryptographyModule, passport_1.PassportModule],
        controllers: [
            cliente_controller_1.ClienteController,
            imovel_controller_1.ImovelController,
            estagio_controller_1.EstagioController,
            negociacao_controller_1.NegociacaoController,
            dashboard_controller_1.DashboardController,
            auth_controller_1.AuthController,
            reports_controller_1.ReportsController,
            atividade_controller_1.AtividadeController,
            tarefa_controller_1.TarefaController,
        ],
        providers: [
            create_cliente_1.CreateClienteUseCase,
            update_cliente_1.UpdateClienteUseCase,
            create_imovel_1.CreateImovelUseCase,
            update_imovel_1.UpdateImovelUseCase,
            create_estagio_1.CreateEstagioUseCase,
            create_negociacao_1.CreateNegociacaoUseCase,
            move_negociacao_estagio_1.MoveNegociacaoEstagioUseCase,
            get_dashboard_metrics_1.GetDashboardMetricsUseCase,
            get_sales_report_1.GetSalesReportUseCase,
            create_atividade_1.CreateAtividadeUseCase,
            list_atividades_1.ListAtividadesUseCase,
            create_tarefa_1.CreateTarefaUseCase,
            list_tarefas_1.ListTarefasUseCase,
            update_tarefa_1.UpdateTarefaUseCase,
            complete_tarefa_1.CompleteTarefaUseCase,
            delete_tarefa_1.DeleteTarefaUseCase,
            register_user_1.RegisterUserUseCase,
            authenticate_user_1.AuthenticateUserUseCase,
            jwt_strategy_1.JwtStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map