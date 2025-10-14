export class RegisterUserDto {
  nome: string;
  email: string;
  senha: string;
  role?: 'ADMIN' | 'VENDEDOR' | 'GERENTE';
}
