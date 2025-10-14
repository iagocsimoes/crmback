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
exports.AtividadeController = void 0;
const common_1 = require("@nestjs/common");
const create_atividade_1 = require("../../../domain/application/use-cases/atividade/create-atividade");
const list_atividades_1 = require("../../../domain/application/use-cases/atividade/list-atividades");
const current_user_decorator_1 = require("../auth/current-user.decorator");
class CreateAtividadeDto {
    clienteId;
    tipo;
    descricao;
    data;
    duracao;
    observacoes;
}
let AtividadeController = class AtividadeController {
    createAtividade;
    listAtividades;
    constructor(createAtividade, listAtividades) {
        this.createAtividade = createAtividade;
        this.listAtividades = listAtividades;
    }
    async create(body, user) {
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
    async list(clienteId) {
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
};
exports.AtividadeController = AtividadeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAtividadeDto, Object]),
    __metadata("design:returntype", Promise)
], AtividadeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('clienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AtividadeController.prototype, "list", null);
exports.AtividadeController = AtividadeController = __decorate([
    (0, common_1.Controller)('atividades'),
    __metadata("design:paramtypes", [create_atividade_1.CreateAtividadeUseCase,
        list_atividades_1.ListAtividadesUseCase])
], AtividadeController);
//# sourceMappingURL=atividade.controller.js.map