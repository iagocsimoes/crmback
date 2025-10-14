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
exports.CreateAtividadeUseCase = void 0;
const common_1 = require("@nestjs/common");
const atividade_1 = require("../../../enterprise/entities/atividade");
const atividade_repository_1 = require("../../repositories/atividade-repository");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
let CreateAtividadeUseCase = class CreateAtividadeUseCase {
    atividadeRepository;
    constructor(atividadeRepository) {
        this.atividadeRepository = atividadeRepository;
    }
    async execute(request) {
        const atividade = atividade_1.Atividade.create({
            clienteId: new unique_entity_id_1.UniqueEntityID(request.clienteId),
            usuarioId: new unique_entity_id_1.UniqueEntityID(request.usuarioId),
            tipo: request.tipo,
            descricao: request.descricao,
            data: request.data,
            duracao: request.duracao,
            observacoes: request.observacoes,
            createdAt: new Date(),
        });
        await this.atividadeRepository.create(atividade);
        return {
            atividade,
        };
    }
};
exports.CreateAtividadeUseCase = CreateAtividadeUseCase;
exports.CreateAtividadeUseCase = CreateAtividadeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [atividade_repository_1.AtividadeRepository])
], CreateAtividadeUseCase);
//# sourceMappingURL=create-atividade.js.map