import { User as PrismaUser } from '@prisma/client';
import { User, UserRole } from '@/domain/enterprise/entities/user';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        nome: raw.nome,
        email: raw.email,
        senha: raw.senha,
        role: raw.role as UserRole,
        ativo: raw.ativo,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id.toString(),
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      role: user.role,
      ativo: user.ativo,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    };
  }
}
