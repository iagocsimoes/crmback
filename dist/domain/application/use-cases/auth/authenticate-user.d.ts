import { UserRepository } from '../../repositories/user-repository';
import { HashComparer } from '../../cryptography/hash-comparer';
import { Encrypter } from '../../cryptography/encrypter';
interface AuthenticateUserUseCaseRequest {
    email: string;
    senha: string;
}
interface AuthenticateUserUseCaseResponse {
    accessToken: string;
}
export declare class AuthenticateUserUseCase {
    private userRepository;
    private hashComparer;
    private encrypter;
    constructor(userRepository: UserRepository, hashComparer: HashComparer, encrypter: Encrypter);
    execute(request: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>;
}
export {};
