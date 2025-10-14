import { Injectable } from '@nestjs/common';
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

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(
    request: RegisterUserUseCaseRequest,
  ): Promise<RegisterUserUseCaseResponse> {
    const userExists = await this.userRepository.findByEmail(request.email);

    if (userExists) {
      throw new Error('Usuário já existe com este email');
    }

    const hashedPassword = await this.hashGenerator.hash(request.senha);

    const user = User.create({
      nome: request.nome,
      email: request.email,
      senha: hashedPassword,
      role: request.role ?? 'VENDEDOR',
    });

    await this.userRepository.create(user);

    return { user };
  }
}
