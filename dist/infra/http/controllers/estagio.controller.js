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
exports.EstagioController = void 0;
const common_1 = require("@nestjs/common");
const create_estagio_1 = require("../../../domain/application/use-cases/estagio/create-estagio");
const estagio_repository_1 = require("../../../domain/application/repositories/estagio-repository");
const create_estagio_dto_1 = require("../dtos/create-estagio.dto");
let EstagioController = class EstagioController {
    createEstagioUseCase;
    estagioRepository;
    constructor(createEstagioUseCase, estagioRepository) {
        this.createEstagioUseCase = createEstagioUseCase;
        this.estagioRepository = estagioRepository;
    }
    async create(body) {
        const { estagio } = await this.createEstagioUseCase.execute(body);
        return {
            id: estagio.id.toString(),
            nome: estagio.nome,
            ordem: estagio.ordem,
            cor: estagio.cor,
            createdAt: estagio.createdAt,
        };
    }
    async findAll() {
        const estagios = await this.estagioRepository.findAll();
        return estagios.map((estagio) => ({
            id: estagio.id.toString(),
            nome: estagio.nome,
            ordem: estagio.ordem,
            cor: estagio.cor,
            createdAt: estagio.createdAt,
        }));
    }
    async findOne(id) {
        const estagio = await this.estagioRepository.findById(id);
        if (!estagio) {
            return { error: 'Estágio não encontrado' };
        }
        return {
            id: estagio.id.toString(),
            nome: estagio.nome,
            ordem: estagio.ordem,
            cor: estagio.cor,
            createdAt: estagio.createdAt,
        };
    }
};
exports.EstagioController = EstagioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estagio_dto_1.CreateEstagioDto]),
    __metadata("design:returntype", Promise)
], EstagioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstagioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstagioController.prototype, "findOne", null);
exports.EstagioController = EstagioController = __decorate([
    (0, common_1.Controller)('estagios'),
    __metadata("design:paramtypes", [create_estagio_1.CreateEstagioUseCase,
        estagio_repository_1.EstagioRepository])
], EstagioController);
//# sourceMappingURL=estagio.controller.js.map