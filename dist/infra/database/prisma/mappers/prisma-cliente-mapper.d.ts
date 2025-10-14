import { Cliente as PrismaCliente } from '@prisma/client';
import { Cliente } from '@/domain/enterprise/entities/cliente';
export declare class PrismaClienteMapper {
    static toDomain(raw: PrismaCliente): Cliente;
    static toPrisma(cliente: Cliente): PrismaCliente;
}
