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
exports.CreateClienteUseCase = void 0;
const common_1 = require("@nestjs/common");
const cliente_1 = require("../../../enterprise/entities/cliente");
const cliente_repository_1 = require("../../repositories/cliente-repository");
let CreateClienteUseCase = class CreateClienteUseCase {
    clienteRepository;
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(request) {
        const cliente = cliente_1.Cliente.create({
            nome: request.nome,
            telefone: request.telefone,
            email: request.email,
            endereco: request.endereco,
            formaPagamento: request.formaPagamento,
            origemLead: request.origemLead,
            cpfCnpj: request.cpfCnpj,
            observacoes: request.observacoes,
        });
        await this.clienteRepository.create(cliente);
        return { cliente };
    }
};
exports.CreateClienteUseCase = CreateClienteUseCase;
exports.CreateClienteUseCase = CreateClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cliente_repository_1.ClienteRepository])
], CreateClienteUseCase);
//# sourceMappingURL=create-cliente.js.map