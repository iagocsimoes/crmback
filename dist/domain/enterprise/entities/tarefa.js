"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarefa = void 0;
const entity_1 = require("../../../core/entities/entity");
class Tarefa extends entity_1.Entity {
    get titulo() {
        return this.props.titulo;
    }
    get descricao() {
        return this.props.descricao;
    }
    get status() {
        return this.props.status;
    }
    get prioridade() {
        return this.props.prioridade;
    }
    get dataVencimento() {
        return this.props.dataVencimento;
    }
    get clienteId() {
        return this.props.clienteId;
    }
    get usuarioId() {
        return this.props.usuarioId;
    }
    get dataConclusao() {
        return this.props.dataConclusao;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    set titulo(titulo) {
        this.props.titulo = titulo;
        this.touch();
    }
    set descricao(descricao) {
        this.props.descricao = descricao;
        this.touch();
    }
    set status(status) {
        this.props.status = status;
        this.touch();
    }
    set prioridade(prioridade) {
        this.props.prioridade = prioridade;
        this.touch();
    }
    set dataVencimento(dataVencimento) {
        this.props.dataVencimento = dataVencimento;
        this.touch();
    }
    set dataConclusao(dataConclusao) {
        this.props.dataConclusao = dataConclusao;
        this.touch();
    }
    marcarComoConcluida() {
        this.props.status = 'CONCLUIDA';
        this.props.dataConclusao = new Date();
        this.touch();
    }
    verificarSeAtrasada() {
        if (this.props.status !== 'CONCLUIDA') {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const vencimento = new Date(this.props.dataVencimento);
            vencimento.setHours(0, 0, 0, 0);
            if (vencimento < hoje) {
                this.props.status = 'ATRASADA';
            }
        }
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const tarefa = new Tarefa({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);
        tarefa.verificarSeAtrasada();
        return tarefa;
    }
}
exports.Tarefa = Tarefa;
//# sourceMappingURL=tarefa.js.map