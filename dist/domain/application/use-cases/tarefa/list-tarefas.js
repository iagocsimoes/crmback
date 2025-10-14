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
exports.ListTarefasUseCase = void 0;
const common_1 = require("@nestjs/common");
const tarefa_repository_1 = require("../../repositories/tarefa-repository");
let ListTarefasUseCase = class ListTarefasUseCase {
    tarefaRepository;
    constructor(tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }
    async execute(request) {
        let tarefas;
        if (request.clienteId) {
            tarefas = await this.tarefaRepository.findByClienteId(request.clienteId);
        }
        else if (request.usuarioId) {
            tarefas = await this.tarefaRepository.findByUsuarioId(request.usuarioId);
        }
        else {
            tarefas = await this.tarefaRepository.findAll();
        }
        tarefas.forEach((tarefa) => tarefa.verificarSeAtrasada());
        return {
            tarefas,
        };
    }
};
exports.ListTarefasUseCase = ListTarefasUseCase;
exports.ListTarefasUseCase = ListTarefasUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tarefa_repository_1.TarefaRepository])
], ListTarefasUseCase);
//# sourceMappingURL=list-tarefas.js.map