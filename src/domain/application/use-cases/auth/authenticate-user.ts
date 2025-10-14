import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute(
    request: AuthenticateUserUseCaseRequest,
  ): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    if (!user.ativo) {
      throw new Error('Usuário inativo');
    }

    const isPasswordValid = await this.hashComparer.compare(
      request.senha,
      user.senha,
    );

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    });

    return { accessToken };
  }
}
