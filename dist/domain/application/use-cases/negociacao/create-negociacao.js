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
exports.CreateNegociacaoUseCase = void 0;
const common_1 = require("@nestjs/common");
const negociacao_1 = require("../../../enterprise/entities/negociacao");
const negociacao_repository_1 = require("../../repositories/negociacao-repository");
const imovel_repository_1 = require("../../repositories/imovel-repository");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
let CreateNegociacaoUseCase = class CreateNegociacaoUseCase {
    negociacaoRepository;
    imovelRepository;
    constructor(negociacaoRepository, imovelRepository) {
        this.negociacaoRepository = negociacaoRepository;
        this.imovelRepository = imovelRepository;
    }
    async execute(request) {
        const negociacao = negociacao_1.Negociacao.create({
            clienteId: new unique_entity_id_1.UniqueEntityID(request.clienteId),
            imovelId: new unique_entity_id_1.UniqueEntityID(request.imovelId),
            estagioId: new unique_entity_id_1.UniqueEntityID(request.estagioId),
            valor: request.valor,
            contratoAssinado: false,
            observacoes: request.observacoes,
        });
        await this.negociacaoRepository.create(negociacao);
        const imovel = await this.imovelRepository.findById(request.imovelId);
        if (imovel && imovel.status === 'DISPONIVEL') {
            imovel.status = 'PRE_RESERVA';
            await this.imovelRepository.save(imovel);
        }
        return { negociacao };
    }
};
exports.CreateNegociacaoUseCase = CreateNegociacaoUseCase;
exports.CreateNegociacaoUseCase = CreateNegociacaoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [negociacao_repository_1.NegociacaoRepository,
        imovel_repository_1.ImovelRepository])
], CreateNegociacaoUseCase);
//# sourceMappingURL=create-negociacao.js.map