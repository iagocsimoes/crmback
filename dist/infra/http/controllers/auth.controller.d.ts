import { RegisterUserUseCase } from '@/domain/application/use-cases/auth/register-user';
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/auth/authenticate-user';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginDto } from '../dtos/login.dto';
import type { CurrentUserPayload } from '../auth/current-user.decorator';
export declare class AuthController {
    private registerUserUseCase;
    private authenticateUserUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase, authenticateUserUseCase: AuthenticateUserUseCase);
    register(body: RegisterUserDto): Promise<{
        id: string;
        nome: string;
        email: string;
        role: import("../../../domain/enterprise/entities/user").UserRole;
    }>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    me(user: CurrentUserPayload): Promise<{
        userId: string;
        email: string;
        role: string;
    }>;
}
