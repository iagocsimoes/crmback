"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptographyModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const hash_comparer_1 = require("../../domain/application/cryptography/hash-comparer");
const hash_generator_1 = require("../../domain/application/cryptography/hash-generator");
const encrypter_1 = require("../../domain/application/cryptography/encrypter");
const bcrypt_hasher_1 = require("./bcrypt-hasher");
const jwt_encrypter_1 = require("./jwt-encrypter");
let CryptographyModule = class CryptographyModule {
};
exports.CryptographyModule = CryptographyModule;
exports.CryptographyModule = CryptographyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret-key-change-in-production',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        providers: [
            {
                provide: hash_comparer_1.HashComparer,
                useClass: bcrypt_hasher_1.BcryptHasher,
            },
            {
                provide: hash_generator_1.HashGenerator,
                useClass: bcrypt_hasher_1.BcryptHasher,
            },
            {
                provide: encrypter_1.Encrypter,
                useClass: jwt_encrypter_1.JwtEncrypter,
            },
        ],
        exports: [hash_comparer_1.HashComparer, hash_generator_1.HashGenerator, encrypter_1.Encrypter],
    })
], CryptographyModule);
//# sourceMappingURL=cryptography.module.js.map