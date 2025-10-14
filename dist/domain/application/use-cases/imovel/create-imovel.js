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
exports.CreateImovelUseCase = void 0;
const common_1 = require("@nestjs/common");
const imovel_1 = require("../../../enterprise/entities/imovel");
const imovel_repository_1 = require("../../repositories/imovel-repository");
let CreateImovelUseCase = class CreateImovelUseCase {
    imovelRepository;
    constructor(imovelRepository) {
        this.imovelRepository = imovelRepository;
    }
    async execute(request) {
        const imovel = imovel_1.Imovel.create({
            identificacao: request.identificacao,
            status: request.status ?? 'DISPONIVEL',
            vgv: request.vgv,
            descricao: request.descricao,
            tipo: request.tipo,
            metragem: request.metragem,
            quartos: request.quartos,
            vagas: request.vagas,
        });
        await this.imovelRepository.create(imovel);
        return { imovel };
    }
};
exports.CreateImovelUseCase = CreateImovelUseCase;
exports.CreateImovelUseCase = CreateImovelUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [imovel_repository_1.ImovelRepository])
], CreateImovelUseCase);
//# sourceMappingURL=create-imovel.js.map