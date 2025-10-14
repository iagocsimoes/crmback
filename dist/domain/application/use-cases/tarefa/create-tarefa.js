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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTarefaUseCase = void 0;
const common_1 = require("@nestjs/common");
const tarefa_1 = require("../../../enterprise/entities/tarefa");
const tarefa_repository_1 = require("../../repositories/tarefa-repository");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
let CreateTarefaUseCase = class CreateTarefaUseCase {
    tarefaRepository;
    constructor(tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }
    async execute(request) {
        const tarefa = tarefa_1.Tarefa.create({
            titulo: request.titulo,
            descricao: request.descricao,
            status: 'PENDENTE',
            prioridade: request.prioridade,
            dataVencimento: request.dataVencimento,
            clienteId: request.clienteId
                ? new unique_entity_id_1.UniqueEntityID(request.clienteId)
                : undefined,
            usuarioId: new unique_entity_id_1.UniqueEntityID(request.usuarioId),
            createdAt: new Date(),
        });
        await this.tarefaRepository.create(tarefa);
        return {
            tarefa,
        };
    }
};
exports.CreateTarefaUseCase = CreateTarefaUseCase;
exports.CreateTarefaUseCase = CreateTarefaUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tarefa_repository_1.TarefaRepository])
], CreateTarefaUseCase);
//# sourceMappingURL=create-tarefa.js.map