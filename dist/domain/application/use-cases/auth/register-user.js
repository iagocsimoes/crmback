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
exports.RegisterUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../../enterprise/entities/user");
const user_repository_1 = require("../../repositories/user-repository");
const hash_generator_1 = require("../../cryptography/hash-generator");
let RegisterUserUseCase = class RegisterUserUseCase {
    userRepository;
    hashGenerator;
    constructor(userRepository, hashGenerator) {
        this.userRepository = userRepository;
        this.hashGenerator = hashGenerator;
    }
    async execute(request) {
        const userExists = await this.userRepository.findByEmail(request.email);
        if (userExists) {
            throw new Error('Usuário já existe com este email');
        }
        const hashedPassword = await this.hashGenerator.hash(request.senha);
        const user = user_1.User.create({
            nome: request.nome,
            email: request.email,
            senha: hashedPassword,
            role: request.role ?? 'VENDEDOR',
        });
        await this.userRepository.create(user);
        return { user };
    }
};
exports.RegisterUserUseCase = RegisterUserUseCase;
exports.RegisterUserUseCase = RegisterUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        hash_generator_1.HashGenerator])
], RegisterUserUseCase);
//# sourceMappingURL=register-user.js.map