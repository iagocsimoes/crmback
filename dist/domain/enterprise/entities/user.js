"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_1 = require("../../../core/entities/entity");
class User extends entity_1.Entity {
    get nome() {
        return this.props.nome;
    }
    set nome(nome) {
        this.props.nome = nome;
        this.touch();
    }
    get email() {
        return this.props.email;
    }
    set email(email) {
        this.props.email = email;
        this.touch();
    }
    get senha() {
        return this.props.senha;
    }
    set senha(senha) {
        this.props.senha = senha;
        this.touch();
    }
    get role() {
        return this.props.role;
    }
    set role(role) {
        this.props.role = role;
        this.touch();
    }
    get ativo() {
        return this.props.ativo;
    }
    set ativo(ativo) {
        this.props.ativo = ativo;
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
        const user = new User({
            ...props,
            ativo: props.ativo ?? true,
            createdAt: new Date(),
        }, id);
        return user;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map