"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Negociacao = void 0;
const aggregate_root_1 = require("../../../core/entities/aggregate-root");
class Negociacao extends aggregate_root_1.AggregateRoot {
    get clienteId() {
        return this.props.clienteId;
    }
    get imovelId() {
        return this.props.imovelId;
    }
    get estagioId() {
        return this.props.estagioId;
    }
    set estagioId(estagioId) {
        this.props.estagioId = estagioId;
        this.touch();
    }
    get valor() {
        return this.props.valor;
    }
    set valor(valor) {
        this.props.valor = valor;
        this.touch();
    }
    get formaPagamento() {
        return this.props.formaPagamento;
    }
    set formaPagamento(formaPagamento) {
        this.props.formaPagamento = formaPagamento;
        this.touch();
    }
    get valorEntrada() {
        return this.props.valorEntrada;
    }
    set valorEntrada(valorEntrada) {
        this.props.valorEntrada = valorEntrada;
        this.touch();
    }
    get numeroParcelas() {
        return this.props.numeroParcelas;
    }
    set numeroParcelas(numeroParcelas) {
        this.props.numeroParcelas = numeroParcelas;
        this.touch();
    }
    get contratoAssinado() {
        return this.props.contratoAssinado;
    }
    set contratoAssinado(contratoAssinado) {
        this.props.contratoAssinado = contratoAssinado;
        this.touch();
    }
    get dataAssinatura() {
        return this.props.dataAssinatura;
    }
    set dataAssinatura(dataAssinatura) {
        this.props.dataAssinatura = dataAssinatura ? new Date(dataAssinatura) : undefined;
        this.touch();
    }
    get dataVencimento() {
        return this.props.dataVencimento;
    }
    set dataVencimento(dataVencimento) {
        this.props.dataVencimento = dataVencimento ? new Date(dataVencimento) : undefined;
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
        const negociacao = new Negociacao({
            ...props,
            createdAt: new Date(),
        }, id);
        return negociacao;
    }
}
exports.Negociacao = Negociacao;
//# sourceMappingURL=negociacao.js.map