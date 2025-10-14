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
exports.NegociacaoController = void 0;
const common_1 = require("@nestjs/common");
const create_negociacao_1 = require("../../../domain/application/use-cases/negociacao/create-negociacao");
const move_negociacao_estagio_1 = require("../../../domain/application/use-cases/negociacao/move-negociacao-estagio");
const negociacao_repository_1 = require("../../../domain/application/repositories/negociacao-repository");
const create_negociacao_dto_1 = require("../dtos/create-negociacao.dto");
const move_negociacao_dto_1 = require("../dtos/move-negociacao.dto");
let NegociacaoController = class NegociacaoController {
    createNegociacaoUseCase;
    moveNegociacaoEstagioUseCase;
    negociacaoRepository;
    constructor(createNegociacaoUseCase, moveNegociacaoEstagioUseCase, negociacaoRepository) {
        this.createNegociacaoUseCase = createNegociacaoUseCase;
        this.moveNegociacaoEstagioUseCase = moveNegociacaoEstagioUseCase;
        this.negociacaoRepository = negociacaoRepository;
    }
    async create(body) {
        const { negociacao } = await this.createNegociacaoUseCase.execute(body);
        return {
            id: negociacao.id.toString(),
            clienteId: negociacao.clienteId.toString(),
            imovelId: negociacao.imovelId.toString(),
            estagioId: negociacao.estagioId.toString(),
            valor: negociacao.valor,
            observacoes: negociacao.observacoes,
            createdAt: negociacao.createdAt,
        };
    }
    async findAll() {
        const negociacoes = await this.negociacaoRepository.findAllComDetalhes();
        return negociacoes.map((item) => ({
            id: item.negociacao.id.toString(),
            clienteId: item.negociacao.clienteId.toString(),
            cliente: {
                id: item.negociacao.clienteId.toString(),
                nome: item.clienteNome,
                email: item.clienteEmail,
                telefone: item.clienteTelefone,
                cpfCnpj: item.clienteCpfCnpj,
            },
            imovelId: item.negociacao.imovelId.toString(),
            imovel: {
                id: item.negociacao.imovelId.toString(),
                identificacao: item.imovelIdentificacao,
                tipo: item.imovelTipo,
                endereco: item.imovelEndereco,
                valor: item.imovelValor,
                metragem: item.imovelMetragem,
                quartos: item.imovelQuartos,
                vagas: item.imovelVagas,
            },
            estagioId: item.negociacao.estagioId.toString(),
            estagio: {
                id: item.negociacao.estagioId.toString(),
                nome: item.estagioNome,
            },
            valor: item.negociacao.valor,
            formaPagamento: item.negociacao.formaPagamento,
            valorEntrada: item.negociacao.valorEntrada,
            numeroParcelas: item.negociacao.numeroParcelas,
            contratoAssinado: item.negociacao.contratoAssinado,
            dataAssinatura: item.negociacao.dataAssinatura,
            dataVencimento: item.negociacao.dataVencimento,
            observacoes: item.negociacao.observacoes,
            createdAt: item.negociacao.createdAt,
            updatedAt: item.negociacao.updatedAt,
        }));
    }
    async findOne(id) {
        const negociacao = await this.negociacaoRepository.findById(id);
        if (!negociacao) {
            return { error: 'Negociação não encontrada' };
        }
        return {
            id: negociacao.id.toString(),
            clienteId: negociacao.clienteId.toString(),
            imovelId: negociacao.imovelId.toString(),
            estagioId: negociacao.estagioId.toString(),
            valor: negociacao.valor,
            observacoes: negociacao.observacoes,
            createdAt: negociacao.createdAt,
        };
    }
    async update(id, body) {
        const negociacao = await this.negociacaoRepository.findById(id);
        if (!negociacao) {
            return { error: 'Negociação não encontrada' };
        }
        if (body.valor !== undefined)
            negociacao.valor = body.valor;
        if (body.formaPagamento !== undefined)
            negociacao.formaPagamento = body.formaPagamento;
        if (body.valorEntrada !== undefined)
            negociacao.valorEntrada = body.valorEntrada;
        if (body.numeroParcelas !== undefined)
            negociacao.numeroParcelas = body.numeroParcelas;
        if (body.contratoAssinado !== undefined)
            negociacao.contratoAssinado = body.contratoAssinado;
        if (body.dataAssinatura !== undefined)
            negociacao.dataAssinatura = body.dataAssinatura;
        if (body.dataVencimento !== undefined)
            negociacao.dataVencimento = body.dataVencimento;
        if (body.observacoes !== undefined)
            negociacao.observacoes = body.observacoes;
        await this.negociacaoRepository.save(negociacao);
        return { success: true };
    }
    async moverEstagio(id, body) {
        await this.moveNegociacaoEstagioUseCase.execute({
            negociacaoId: id,
            novoEstagioId: body.novoEstagioId,
        });
        return { success: true };
    }
};
exports.NegociacaoController = NegociacaoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_negociacao_dto_1.CreateNegociacaoDto]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/mover'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, move_negociacao_dto_1.MoveNegociacaoDto]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "moverEstagio", null);
exports.NegociacaoController = NegociacaoController = __decorate([
    (0, common_1.Controller)('negociacoes'),
    __metadata("design:paramtypes", [create_negociacao_1.CreateNegociacaoUseCase,
        move_negociacao_estagio_1.MoveNegociacaoEstagioUseCase,
        negociacao_repository_1.NegociacaoRepository])
], NegociacaoController);
//# sourceMappingURL=negociacao.controller.js.map