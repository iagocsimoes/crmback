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
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const create_cliente_1 = require("../../../domain/application/use-cases/cliente/create-cliente");
const update_cliente_1 = require("../../../domain/application/use-cases/cliente/update-cliente");
const cliente_repository_1 = require("../../../domain/application/repositories/cliente-repository");
const create_cliente_dto_1 = require("../dtos/create-cliente.dto");
const update_cliente_dto_1 = require("../dtos/update-cliente.dto");
let ClienteController = class ClienteController {
    createClienteUseCase;
    updateClienteUseCase;
    clienteRepository;
    constructor(createClienteUseCase, updateClienteUseCase, clienteRepository) {
        this.createClienteUseCase = createClienteUseCase;
        this.updateClienteUseCase = updateClienteUseCase;
        this.clienteRepository = clienteRepository;
    }
    async create(body) {
        const { cliente } = await this.createClienteUseCase.execute(body);
        return {
            id: cliente.id.toString(),
            nome: cliente.nome,
            telefone: cliente.telefone,
            email: cliente.email,
            endereco: cliente.endereco,
            formaPagamento: cliente.formaPagamento,
            origemLead: cliente.origemLead,
            cpfCnpj: cliente.cpfCnpj,
            observacoes: cliente.observacoes,
            createdAt: cliente.createdAt,
        };
    }
    async findAll() {
        const clientes = await this.clienteRepository.findAll();
        return clientes.map((cliente) => ({
            id: cliente.id.toString(),
            nome: cliente.nome,
            telefone: cliente.telefone,
            email: cliente.email,
            endereco: cliente.endereco,
            formaPagamento: cliente.formaPagamento,
            origemLead: cliente.origemLead,
            cpfCnpj: cliente.cpfCnpj,
            observacoes: cliente.observacoes,
            createdAt: cliente.createdAt,
        }));
    }
    async findOne(id) {
        const cliente = await this.clienteRepository.findById(id);
        if (!cliente) {
            return { error: 'Cliente não encontrado' };
        }
        return {
            id: cliente.id.toString(),
            nome: cliente.nome,
            telefone: cliente.telefone,
            email: cliente.email,
            endereco: cliente.endereco,
            formaPagamento: cliente.formaPagamento,
            origemLead: cliente.origemLead,
            cpfCnpj: cliente.cpfCnpj,
            observacoes: cliente.observacoes,
            createdAt: cliente.createdAt,
        };
    }
    async update(id, body) {
        const { cliente } = await this.updateClienteUseCase.execute({
            id,
            ...body,
        });
        return {
            id: cliente.id.toString(),
            nome: cliente.nome,
            telefone: cliente.telefone,
            email: cliente.email,
            endereco: cliente.endereco,
            formaPagamento: cliente.formaPagamento,
            origemLead: cliente.origemLead,
            cpfCnpj: cliente.cpfCnpj,
            observacoes: cliente.observacoes,
            updatedAt: cliente.updatedAt,
        };
    }
    async delete(id) {
        await this.clienteRepository.delete(id);
        return { message: 'Cliente excluído com sucesso' };
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "delete", null);
exports.ClienteController = ClienteController = __decorate([
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [create_cliente_1.CreateClienteUseCase,
        update_cliente_1.UpdateClienteUseCase,
        cliente_repository_1.ClienteRepository])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map