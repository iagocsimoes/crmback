"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const cliente_repository_1 = require("../../domain/application/repositories/cliente-repository");
const imovel_repository_1 = require("../../domain/application/repositories/imovel-repository");
const estagio_repository_1 = require("../../domain/application/repositories/estagio-repository");
const negociacao_repository_1 = require("../../domain/application/repositories/negociacao-repository");
const user_repository_1 = require("../../domain/application/repositories/user-repository");
const atividade_repository_1 = require("../../domain/application/repositories/atividade-repository");
const tarefa_repository_1 = require("../../domain/application/repositories/tarefa-repository");
const prisma_cliente_repository_1 = require("./prisma/repositories/prisma-cliente-repository");
const prisma_imovel_repository_1 = require("./prisma/repositories/prisma-imovel-repository");
const prisma_estagio_repository_1 = require("./prisma/repositories/prisma-estagio-repository");
const prisma_negociacao_repository_1 = require("./prisma/repositories/prisma-negociacao-repository");
const prisma_user_repository_1 = require("./prisma/repositories/prisma-user-repository");
const prisma_atividade_repository_1 = require("./prisma/repositories/prisma-atividade-repository");
const prisma_tarefa_repository_1 = require("./prisma/repositories/prisma-tarefa-repository");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: cliente_repository_1.ClienteRepository,
                useClass: prisma_cliente_repository_1.PrismaClienteRepository,
            },
            {
                provide: imovel_repository_1.ImovelRepository,
                useClass: prisma_imovel_repository_1.PrismaImovelRepository,
            },
            {
                provide: estagio_repository_1.EstagioRepository,
                useClass: prisma_estagio_repository_1.PrismaEstagioRepository,
            },
            {
                provide: negociacao_repository_1.NegociacaoRepository,
                useClass: prisma_negociacao_repository_1.PrismaNegociacaoRepository,
            },
            {
                provide: user_repository_1.UserRepository,
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
            {
                provide: atividade_repository_1.AtividadeRepository,
                useClass: prisma_atividade_repository_1.PrismaAtividadeRepository,
            },
            {
                provide: tarefa_repository_1.TarefaRepository,
                useClass: prisma_tarefa_repository_1.PrismaTarefaRepository,
            },
        ],
        exports: [
            cliente_repository_1.ClienteRepository,
            imovel_repository_1.ImovelRepository,
            estagio_repository_1.EstagioRepository,
            negociacao_repository_1.NegociacaoRepository,
            user_repository_1.UserRepository,
            atividade_repository_1.AtividadeRepository,
            tarefa_repository_1.TarefaRepository,
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map