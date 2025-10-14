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
exports.UpdateImovelUseCase = void 0;
const common_1 = require("@nestjs/common");
const imovel_repository_1 = require("../../repositories/imovel-repository");
let UpdateImovelUseCase = class UpdateImovelUseCase {
    imovelRepository;
    constructor(imovelRepository) {
        this.imovelRepository = imovelRepository;
    }
    async execute(request) {
        const imovel = await this.imovelRepository.findById(request.id);
        if (!imovel) {
            throw new Error('Imóvel não encontrado');
        }
        if (request.identificacao !== undefined) {
            imovel.identificacao = request.identificacao;
        }
        if (request.vgv !== undefined) {
            imovel.vgv = request.vgv;
        }
        if (request.status !== undefined) {
            imovel.status = request.status;
        }
        if (request.descricao !== undefined) {
            imovel.descricao = request.descricao;
        }
        if (request.tipo !== undefined) {
            imovel.tipo = request.tipo;
        }
        if (request.metragem !== undefined) {
            imovel.metragem = request.metragem;
        }
        if (request.quartos !== undefined) {
            imovel.quartos = request.quartos;
        }
        if (request.vagas !== undefined) {
            imovel.vagas = request.vagas;
        }
        await this.imovelRepository.save(imovel);
        return { imovel };
    }
};
exports.UpdateImovelUseCase = UpdateImovelUseCase;
exports.UpdateImovelUseCase = UpdateImovelUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [imovel_repository_1.ImovelRepository])
], UpdateImovelUseCase);
//# sourceMappingURL=update-imovel.js.map