import { User, UserRole } from '@/domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user-repository';
import { HashGenerator } from '../../cryptography/hash-generator';
interface RegisterUserUseCaseRequest {
    nome: string;
    email: string;
    senha: string;
    role?: UserRole;
}
interface RegisterUserUseCaseResponse {
    user: User;
}
export declare class RegisterUserUseCase {
    private userRepository;
    private hashGenerator;
    constructor(userRepository: UserRepository, hashGenerator: HashGenerator);
    execute(request: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>;
}
export {};
