"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const entity_1 = require("../../../core/entities/entity");
class Cliente extends entity_1.Entity {
    get nome() {
        return this.props.nome;
    }
    set nome(nome) {
        this.props.nome = nome;
        this.touch();
    }
    get telefone() {
        return this.props.telefone;
    }
    set telefone(telefone) {
        this.props.telefone = telefone;
        this.touch();
    }
    get email() {
        return this.props.email;
    }
    set email(email) {
        this.props.email = email;
        this.touch();
    }
    get endereco() {
        return this.props.endereco;
    }
    set endereco(endereco) {
        this.props.endereco = endereco;
        this.touch();
    }
    get formaPagamento() {
        return this.props.formaPagamento;
    }
    set formaPagamento(formaPagamento) {
        this.props.formaPagamento = formaPagamento;
        this.touch();
    }
    get origemLead() {
        return this.props.origemLead;
    }
    set origemLead(origemLead) {
        this.props.origemLead = origemLead;
        this.touch();
    }
    get cpfCnpj() {
        return this.props.cpfCnpj;
    }
    set cpfCnpj(cpfCnpj) {
        this.props.cpfCnpj = cpfCnpj;
        this.touch();
    }
    get observacoes() {
        return this.props.observacoes;
    }
    set observacoes(observacoes) {
        this.props.observacoes = observacoes;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const cliente = new Cliente({
            ...props,
            createdAt: new Date(),
        }, id);
        return cliente;
    }
}
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map