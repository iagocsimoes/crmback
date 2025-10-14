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
exports.UpdateClienteUseCase = void 0;
const common_1 = require("@nestjs/common");
const cliente_repository_1 = require("../../repositories/cliente-repository");
let UpdateClienteUseCase = class UpdateClienteUseCase {
    clienteRepository;
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(request) {
        const cliente = await this.clienteRepository.findById(request.id);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        if (request.nome !== undefined) {
            cliente.nome = request.nome;
        }
        if (request.telefone !== undefined) {
            cliente.telefone = request.telefone;
        }
        if (request.email !== undefined) {
            cliente.email = request.email;
        }
        if (request.endereco !== undefined) {
            cliente.endereco = request.endereco;
        }
        if (request.formaPagamento !== undefined) {
            cliente.formaPagamento = request.formaPagamento;
        }
        if (request.origemLead !== undefined) {
            cliente.origemLead = request.origemLead;
        }
        if (request.cpfCnpj !== undefined) {
            cliente.cpfCnpj = request.cpfCnpj;
        }
        if (request.observacoes !== undefined) {
            cliente.observacoes = request.observacoes;
        }
        await this.clienteRepository.save(cliente);
        return { cliente };
    }
};
exports.UpdateClienteUseCase = UpdateClienteUseCase;
exports.UpdateClienteUseCase = UpdateClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cliente_repository_1.ClienteRepository])
], UpdateClienteUseCase);
//# sourceMappingURL=update-cliente.js.map