import { User as PrismaUser } from '@prisma/client';
import { User } from '@/domain/enterprise/entities/user';
export declare class PrismaUserMapper {
    static toDomain(raw: PrismaUser): User;
    static toPrisma(user: User): PrismaUser;
}
