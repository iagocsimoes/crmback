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
exports.DeleteNegociacaoUseCase = void 0;
const common_1 = require("@nestjs/common");
const negociacao_repository_1 = require("../../repositories/negociacao-repository");
let DeleteNegociacaoUseCase = class DeleteNegociacaoUseCase {
    negociacaoRepository;
    constructor(negociacaoRepository) {
        this.negociacaoRepository = negociacaoRepository;
    }
    async execute(request) {
        const negociacao = await this.negociacaoRepository.findById(request.negociacaoId);
        if (!negociacao) {
            throw new Error('Negociação não encontrada');
        }
        await this.negociacaoRepository.delete(request.negociacaoId);
        return {
            success: true,
        };
    }
};
exports.DeleteNegociacaoUseCase = DeleteNegociacaoUseCase;
exports.DeleteNegociacaoUseCase = DeleteNegociacaoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [negociacao_repository_1.NegociacaoRepository])
], DeleteNegociacaoUseCase);
//# sourceMappingURL=delete-negociacao.js.map