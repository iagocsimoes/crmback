"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atividade = void 0;
const entity_1 = require("../../../core/entities/entity");
class Atividade extends entity_1.Entity {
    get clienteId() {
        return this.props.clienteId;
    }
    get usuarioId() {
        return this.props.usuarioId;
    }
    get tipo() {
        return this.props.tipo;
    }
    get descricao() {
        return this.props.descricao;
    }
    get data() {
        return this.props.data;
    }
    get duracao() {
        return this.props.duracao;
    }
    get observacoes() {
        return this.props.observacoes;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    set tipo(tipo) {
        this.props.tipo = tipo;
        this.touch();
    }
    set descricao(descricao) {
        this.props.descricao = descricao;
        this.touch();
    }
    set data(data) {
        this.props.data = data;
        this.touch();
    }
    set duracao(duracao) {
        this.props.duracao = duracao;
        this.touch();
    }
    set observacoes(observacoes) {
        this.props.observacoes = observacoes;
        this.touch();
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const atividade = new Atividade({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return atividade;
    }
}
exports.Atividade = Atividade;
//# sourceMappingURL=atividade.js.map