import { Body, Controller, Post, Get } from '@nestjs/common';
import { RegisterUserUseCase } from '@/domain/application/use-cases/auth/register-user';
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/auth/authenticate-user';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { Public } from '../auth/public.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserPayload } from '../auth/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    const { user } = await this.registerUserUseCase.execute(body);

    return {
      id: user.id.toString(),
      nome: user.nome,
      email: user.email,
      role: user.role,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    const { accessToken } = await this.authenticateUserUseCase.execute(body);

    return {
      access_token: accessToken,
    };
  }

  @Get('me')
  async me(@CurrentUser() user: CurrentUserPayload) {
    return {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };
  }
}
