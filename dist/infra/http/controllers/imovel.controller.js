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
exports.ImovelController = void 0;
const common_1 = require("@nestjs/common");
const create_imovel_1 = require("../../../domain/application/use-cases/imovel/create-imovel");
const update_imovel_1 = require("../../../domain/application/use-cases/imovel/update-imovel");
const imovel_repository_1 = require("../../../domain/application/repositories/imovel-repository");
const create_imovel_dto_1 = require("../dtos/create-imovel.dto");
const update_imovel_dto_1 = require("../dtos/update-imovel.dto");
let ImovelController = class ImovelController {
    createImovelUseCase;
    updateImovelUseCase;
    imovelRepository;
    constructor(createImovelUseCase, updateImovelUseCase, imovelRepository) {
        this.createImovelUseCase = createImovelUseCase;
        this.updateImovelUseCase = updateImovelUseCase;
        this.imovelRepository = imovelRepository;
    }
    async create(body) {
        const { imovel } = await this.createImovelUseCase.execute(body);
        return {
            id: imovel.id.toString(),
            identificacao: imovel.identificacao,
            status: imovel.status,
            vgv: imovel.vgv,
            descricao: imovel.descricao,
            tipo: imovel.tipo,
            metragem: imovel.metragem,
            quartos: imovel.quartos,
            vagas: imovel.vagas,
            createdAt: imovel.createdAt,
        };
    }
    async findAll() {
        const imoveis = await this.imovelRepository.findAll();
        return imoveis.map((imovel) => ({
            id: imovel.id.toString(),
            identificacao: imovel.identificacao,
            status: imovel.status,
            vgv: imovel.vgv,
            descricao: imovel.descricao,
            tipo: imovel.tipo,
            metragem: imovel.metragem,
            quartos: imovel.quartos,
            vagas: imovel.vagas,
            createdAt: imovel.createdAt,
        }));
    }
    async findOne(id) {
        const imovel = await this.imovelRepository.findById(id);
        if (!imovel) {
            return { error: 'Imóvel não encontrado' };
        }
        return {
            id: imovel.id.toString(),
            identificacao: imovel.identificacao,
            status: imovel.status,
            vgv: imovel.vgv,
            descricao: imovel.descricao,
            tipo: imovel.tipo,
            metragem: imovel.metragem,
            quartos: imovel.quartos,
            vagas: imovel.vagas,
            createdAt: imovel.createdAt,
        };
    }
    async update(id, body) {
        const { imovel } = await this.updateImovelUseCase.execute({
            id,
            ...body,
        });
        return {
            id: imovel.id.toString(),
            identificacao: imovel.identificacao,
            status: imovel.status,
            vgv: imovel.vgv,
            descricao: imovel.descricao,
            tipo: imovel.tipo,
            metragem: imovel.metragem,
            quartos: imovel.quartos,
            vagas: imovel.vagas,
            updatedAt: imovel.updatedAt,
        };
    }
};
exports.ImovelController = ImovelController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_imovel_dto_1.CreateImovelDto]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_imovel_dto_1.UpdateImovelDto]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "update", null);
exports.ImovelController = ImovelController = __decorate([
    (0, common_1.Controller)('imoveis'),
    __metadata("design:paramtypes", [create_imovel_1.CreateImovelUseCase,
        update_imovel_1.UpdateImovelUseCase,
        imovel_repository_1.ImovelRepository])
], ImovelController);
//# sourceMappingURL=imovel.controller.js.map