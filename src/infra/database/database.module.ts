import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClienteRepository } from '@/domain/application/repositories/cliente-repository';
import { ImovelRepository } from '@/domain/application/repositories/imovel-repository';
import { EstagioRepository } from '@/domain/application/repositories/estagio-repository';
import { NegociacaoRepository } from '@/domain/application/repositories/negociacao-repository';
import { UserRepository } from '@/domain/application/repositories/user-repository';
import { AtividadeRepository } from '@/domain/application/repositories/atividade-repository';
import { TarefaRepository } from '@/domain/application/repositories/tarefa-repository';
import { PrismaClienteRepository } from './prisma/repositories/prisma-cliente-repository';
import { PrismaImovelRepository } from './prisma/repositories/prisma-imovel-repository';
import { PrismaEstagioRepository } from './prisma/repositories/prisma-estagio-repository';
import { PrismaNegociacaoRepository } from './prisma/repositories/prisma-negociacao-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaAtividadeRepository } from './prisma/repositories/prisma-atividade-repository';
import { PrismaTarefaRepository } from './prisma/repositories/prisma-tarefa-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClienteRepository,
      useClass: PrismaClienteRepository,
    },
    {
      provide: ImovelRepository,
      useClass: PrismaImovelRepository,
    },
    {
      provide: EstagioRepository,
      useClass: PrismaEstagioRepository,
    },
    {
      provide: NegociacaoRepository,
      useClass: PrismaNegociacaoRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AtividadeRepository,
      useClass: PrismaAtividadeRepository,
    },
    {
      provide: TarefaRepository,
      useClass: PrismaTarefaRepository,
    },
  ],
  exports: [
    ClienteRepository,
    ImovelRepository,
    EstagioRepository,
    NegociacaoRepository,
    UserRepository,
    AtividadeRepository,
    TarefaRepository,
  ],
})
export class DatabaseModule {}
