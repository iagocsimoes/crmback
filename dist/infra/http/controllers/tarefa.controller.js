"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaController = void 0;
const common_1 = require("@nestjs/common");
const create_tarefa_1 = require("../../../domain/application/use-cases/tarefa/create-tarefa");
const list_tarefas_1 = require("../../../domain/application/use-cases/tarefa/list-tarefas");
const update_tarefa_1 = require("../../../domain/application/use-cases/tarefa/update-tarefa");
const complete_tarefa_1 = require("../../../domain/application/use-cases/tarefa/complete-tarefa");
const delete_tarefa_1 = require("../../../domain/application/use-cases/tarefa/delete-tarefa");
const current_user_decorator_1 = require("../auth/current-user.decorator");
class CreateTarefaDto {
    titulo;
    descricao;
    prioridade;
    dataVencimento;
    clienteId;
}
class UpdateTarefaDto {
    titulo;
    descricao;
    prioridade;
    dataVencimento;
}
let TarefaController = class TarefaController {
    createTarefa;
    listTarefas;
    updateTarefa;
    completeTarefa;
    deleteTarefa;
    constructor(createTarefa, listTarefas, updateTarefa, completeTarefa, deleteTarefa) {
        this.createTarefa = createTarefa;
        this.listTarefas = listTarefas;
        this.updateTarefa = updateTarefa;
        this.completeTarefa = completeTarefa;
        this.deleteTarefa = deleteTarefa;
    }
    async create(body, user) {
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
    async list(usuarioId, clienteId) {
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
    async update(id, body) {
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
    async complete(id) {
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
    async delete(id) {
        await this.deleteTarefa.execute({
            tarefaId: id,
        });
    }
};
exports.TarefaController = TarefaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTarefaDto, Object]),
    __metadata("design:returntype", Promise)
], TarefaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('usuarioId')),
    __param(1, (0, common_1.Query)('clienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TarefaController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTarefaDto]),
    __metadata("design:returntype", Promise)
], TarefaController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/concluir'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TarefaController.prototype, "complete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TarefaController.prototype, "delete", null);
exports.TarefaController = TarefaController = __decorate([
    (0, common_1.Controller)('tarefas'),
    __metadata("design:paramtypes", [create_tarefa_1.CreateTarefaUseCase,
        list_tarefas_1.ListTarefasUseCase,
        update_tarefa_1.UpdateTarefaUseCase,
        complete_tarefa_1.CompleteTarefaUseCase,
        delete_tarefa_1.DeleteTarefaUseCase])
], TarefaController);
//# sourceMappingURL=tarefa.controller.js.map