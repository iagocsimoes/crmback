"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imovel = void 0;
const entity_1 = require("../../../core/entities/entity");
class Imovel extends entity_1.Entity {
    get identificacao() {
        return this.props.identificacao;
    }
    set identificacao(identificacao) {
        this.props.identificacao = identificacao;
        this.touch();
    }
    get status() {
        return this.props.status;
    }
    set status(status) {
        this.props.status = status;
        this.touch();
    }
    get vgv() {
        return this.props.vgv;
    }
    set vgv(vgv) {
        this.props.vgv = vgv;
        this.touch();
    }
    get valor() {
        return this.props.valor;
    }
    set valor(valor) {
        this.props.valor = valor;
        this.touch();
    }
    get endereco() {
        return this.props.endereco;
    }
    set endereco(endereco) {
        this.props.endereco = endereco;
        this.touch();
    }
    get descricao() {
        return this.props.descricao;
    }
    set descricao(descricao) {
        this.props.descricao = descricao;
        this.touch();
    }
    get tipo() {
        return this.props.tipo;
    }
    set tipo(tipo) {
        this.props.tipo = tipo;
        this.touch();
    }
    get metragem() {
        return this.props.metragem;
    }
    set metragem(metragem) {
        this.props.metragem = metragem;
        this.touch();
    }
    get quartos() {
        return this.props.quartos;
    }
    set quartos(quartos) {
        this.props.quartos = quartos;
        this.touch();
    }
    get vagas() {
        return this.props.vagas;
    }
    set vagas(vagas) {
        this.props.vagas = vagas;
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
        const imovel = new Imovel({
            ...props,
            createdAt: new Date(),
        }, id);
        return imovel;
    }
}
exports.Imovel = Imovel;
//# sourceMappingURL=imovel.js.map