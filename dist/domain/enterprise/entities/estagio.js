"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estagio = void 0;
const entity_1 = require("../../../core/entities/entity");
class Estagio extends entity_1.Entity {
    get nome() {
        return this.props.nome;
    }
    set nome(nome) {
        this.props.nome = nome;
        this.touch();
    }
    get ordem() {
        return this.props.ordem;
    }
    set ordem(ordem) {
        this.props.ordem = ordem;
        this.touch();
    }
    get cor() {
        return this.props.cor;
    }
    set cor(cor) {
        this.props.cor = cor;
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
        const estagio = new Estagio({
            ...props,
            createdAt: new Date(),
        }, id);
        return estagio;
    }
}
exports.Estagio = Estagio;
//# sourceMappingURL=estagio.js.map