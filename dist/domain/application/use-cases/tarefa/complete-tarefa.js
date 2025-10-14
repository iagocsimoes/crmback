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
exports.CompleteTarefaUseCase = void 0;
const common_1 = require("@nestjs/common");
const tarefa_repository_1 = require("../../repositories/tarefa-repository");
let CompleteTarefaUseCase = class CompleteTarefaUseCase {
    tarefaRepository;
    constructor(tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }
    async execute(request) {
        const tarefa = await this.tarefaRepository.findById(request.tarefaId);
        if (!tarefa) {
            throw new Error('Tarefa não encontrada');
        }
        tarefa.marcarComoConcluida();
        await this.tarefaRepository.save(tarefa);
        return {
            tarefa,
        };
    }
};
exports.CompleteTarefaUseCase = CompleteTarefaUseCase;
exports.CompleteTarefaUseCase = CompleteTarefaUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tarefa_repository_1.TarefaRepository])
], CompleteTarefaUseCase);
//# sourceMappingURL=complete-tarefa.js.map