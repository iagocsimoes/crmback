# CRM Imobiliário - Backend

Sistema de gerenciamento de vendas de imóveis com pipeline customizável, controle de estoque automático e dashboard de métricas em tempo real.

## 📋 Visão Geral

O CRM Imobiliário é uma API REST construída com NestJS seguindo os princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**. O sistema permite gerenciar:

- **Clientes** - Cadastro completo de leads e compradores
- **Imóveis** - Inventário de unidades com controle de status
- **Pipeline de Vendas** - Estágios customizáveis do funil de vendas
- **Negociações** - Oportunidades que conectam clientes a imóveis
- **Dashboard** - Métricas de desempenho e VGV em tempo real

### Características Principais

✅ **Autenticação JWT** - Sistema completo de login e registro de usuários
✅ **Controle de acesso** - Roles (ADMIN, GERENTE, VENDEDOR) e proteção de rotas
✅ **Controle automático de estoque** - Imóveis são marcados como vendidos automaticamente
✅ **Pipeline customizável** - Defina seus próprios estágios de vendas
✅ **Métricas em tempo real** - Dashboard com VGV, percentuais e status
✅ **Múltiplos imóveis por cliente** - Cliente pode ter várias negociações
✅ **Rastreamento completo** - Histórico de todas as negociações

## 🏗️ Arquitetura

O projeto segue **Clean Architecture** com DDD:

```
src/
├── core/                    # Entidades e conceitos base
│   └── entities/           # Entity, AggregateRoot, UniqueEntityID
├── domain/                  # Camada de domínio
│   ├── application/
│   │   ├── repositories/   # Contratos (interfaces)
│   │   └── use-cases/      # Regras de negócio
│   └── enterprise/
│       └── entities/       # Entidades de negócio
└── infra/                  # Camada de infraestrutura
    ├── database/           # Prisma, mappers, repositórios
    └── http/               # Controllers, DTOs, módulos
```

### Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM para SQLite
- **TypeScript** - Linguagem
- **SQLite** - Banco de dados (fácil migração para PostgreSQL/MySQL)
- **JWT** - Autenticação stateless
- **BCrypt** - Hash de senhas
- **Passport** - Estratégias de autenticação

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- pnpm

### Instalação

```bash
# Instalar dependências
pnpm install

# Executar migrações do banco
npx prisma migrate dev

# Iniciar em modo desenvolvimento
pnpm start:dev
```

O servidor estará disponível em `http://localhost:3000`

## 📡 Rotas da API

> ⚠️ **IMPORTANTE**: Todas as rotas estão protegidas por autenticação JWT, exceto `/auth/register` e `/auth/login`. Você precisa incluir o token no header: `Authorization: Bearer <token>`

### 🔐 Autenticação

#### Registrar Novo Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "nome": "Admin User",
  "email": "admin@crm.com",
  "senha": "senha123",
  "role": "ADMIN"  // ou "GERENTE", "VENDEDOR"
}
```

**Resposta:**
```json
{
  "id": "uuid",
  "nome": "Admin User",
  "email": "admin@crm.com",
  "role": "ADMIN"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@crm.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Use este token em todas as requisições subsequentes:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Obter Dados do Usuário Logado
```http
GET /auth/me
Authorization: Bearer <seu-token>
```

**Resposta:**
```json
{
  "userId": "uuid",
  "email": "admin@crm.com",
  "role": "ADMIN"
}
```

---

### 🧑‍💼 Clientes

#### Criar Cliente
```http
POST /clientes
Content-Type: application/json

{
  "nome": "João Silva",
  "telefone": "11999999999",
  "email": "joao@email.com",
  "endereco": "Rua A, 123",
  "formaPagamento": "AVISTA",
  "origemLead": "Instagram",
  "cpfCnpj": "123.456.789-00",
  "observacoes": "Cliente interessado em apartamento"
}
```

#### Listar Todos os Clientes
```http
GET /clientes
```

#### Buscar Cliente por ID
```http
GET /clientes/:id
```

---

### 🏠 Imóveis

#### Criar Imóvel
```http
POST /imoveis
Content-Type: application/json

{
  "identificacao": "A-101",
  "vgv": 450000,
  "status": "DISPONIVEL",
  "descricao": "Apartamento 2 quartos",
  "tipo": "Apartamento",
  "metragem": 65.5,
  "quartos": 2,
  "vagas": 1
}
```

#### Listar Todos os Imóveis
```http
GET /imoveis
```

#### Buscar Imóvel por ID
```http
GET /imoveis/:id
```

---

### 📊 Estágios do Pipeline

#### Criar Estágio
```http
POST /estagios
Content-Type: application/json

{
  "nome": "Primeiro Contato",
  "ordem": 1,
  "cor": "#3B82F6"
}
```

**Exemplo de Pipeline Completo:**
```json
[
  { "nome": "Primeiro Contato", "ordem": 1, "cor": "#3B82F6" },
  { "nome": "Proposta Enviada", "ordem": 2, "cor": "#8B5CF6" },
  { "nome": "Negociação", "ordem": 3, "cor": "#F59E0B" },
  { "nome": "GANHO", "ordem": 4, "cor": "#10B981" },
  { "nome": "PERDIDO", "ordem": 5, "cor": "#EF4444" }
]
```

#### Listar Todos os Estágios
```http
GET /estagios
```

---

### 💼 Negociações

#### Criar Negociação
```http
POST /negociacoes
Content-Type: application/json

{
  "clienteId": "uuid-do-cliente",
  "imovelId": "uuid-do-imovel",
  "estagioId": "uuid-do-estagio",
  "valor": 450000,
  "observacoes": "Cliente gostou muito da unidade"
}
```

**Comportamento:** Cria a negociação e automaticamente muda o status do imóvel para `PRE_RESERVA`

#### Listar Todas as Negociações (com detalhes)
```http
GET /negociacoes
```

#### Buscar Negociação por ID
```http
GET /negociacoes/:id
```

#### Mover Negociação para Outro Estágio
```http
PATCH /negociacoes/:id/mover
Content-Type: application/json

{
  "novoEstagioId": "uuid-do-novo-estagio"
}
```

**Comportamentos Especiais:**
- **Estágio "GANHO"**: Imóvel é marcado como `VENDIDO` automaticamente
- **Estágio "PERDIDO"**: Imóvel volta para `DISPONIVEL`

---

### 📈 Dashboard

#### Obter Métricas do Dashboard
```http
GET /dashboard/metrics
```

**Resposta:**
```json
{
  "unidades": {
    "total": 37,
    "vendidas": 7,
    "percentualVendido": 18.92,
    "disponiveis": 28,
    "percentualDisponivel": 75.68,
    "preReserva": 2,
    "percentualPreReserva": 5.41
  },
  "vgv": {
    "total": 16500000,
    "vendido": 3150000,
    "percentualVendido": 19.09,
    "preReserva": 900000,
    "percentualPreReserva": 5.45,
    "disponivel": 12450000,
    "percentualDisponivel": 75.45
  },
  "pipeline": [
    {
      "estagioId": "uuid",
      "estagioNome": "Primeiro Contato",
      "ordem": 1,
      "quantidadeNegociacoes": 5,
      "valorTotal": 2250000
    }
  ]
}
```

---

## 🔄 Fluxo de Trabalho Típico

### 1. Configuração Inicial

**a) Registrar primeiro usuário ADMIN:**
```bash
POST /auth/register
{
  "nome": "Admin",
  "email": "admin@crm.com",
  "senha": "senha123",
  "role": "ADMIN"
}
```

**b) Fazer login e obter token:**
```bash
POST /auth/login
{
  "email": "admin@crm.com",
  "senha": "senha123"
}
# Salve o access_token retornado
```

**c) Criar Estágios do Pipeline** (com token)
**d) Cadastrar Imóveis** (com token)

### 2. Operação Diária

**a) Login** → `POST /auth/login` (obter token)
**b) Novo Lead** → `POST /clientes` (com token)
**c) Cliente Interessado** → `POST /negociacoes` (imóvel vira PRE_RESERVA)
**d) Enviar Proposta** → `PATCH /negociacoes/:id/mover`
**e) Cliente Fechou** → Mover para "GANHO" (imóvel vira VENDIDO)
**f) Acompanhar** → `GET /dashboard/metrics`

---

## 🎯 Regras de Negócio

### Status dos Imóveis

| Status | Quando Ocorre |
|--------|---------------|
| `DISPONIVEL` | Imóvel criado ou negociação perdida |
| `PRE_RESERVA` | Negociação criada |
| `VENDIDO` | Negociação movida para estágio "GANHO" |
| `BLOQUEADO` | Definido manualmente |

### Estágios Especiais

- **GANHO**: Imóvel é marcado como `VENDIDO` automaticamente
- **PERDIDO**: Imóvel volta para `DISPONIVEL`

---

## 🗄️ Modelo de Dados

### User (Usuário)
```typescript
{
  nome: string
  email: string (único)
  senha: string (hash bcrypt)
  role: 'ADMIN' | 'GERENTE' | 'VENDEDOR'
  ativo: boolean
}
```

**Roles:**
- **ADMIN**: Acesso total ao sistema
- **GERENTE**: Gerenciamento de vendas e equipe
- **VENDEDOR**: Operação de vendas

### Cliente
```typescript
{
  nome: string
  telefone: string
  email?: string
  endereco?: string
  formaPagamento?: 'AVISTA' | 'FINANCIADO' | 'PARCELADO'
  origemLead?: string
  cpfCnpj?: string
  observacoes?: string
}
```

### Imóvel
```typescript
{
  identificacao: string
  status: 'DISPONIVEL' | 'PRE_RESERVA' | 'VENDIDO' | 'BLOQUEADO'
  vgv: number
  descricao?: string
  tipo?: string
  metragem?: number
  quartos?: number
  vagas?: number
}
```

### Estágio
```typescript
{
  nome: string
  ordem: number
  cor?: string
}
```

### Negociação
```typescript
{
  clienteId: string
  imovelId: string
  estagioId: string
  valor?: number
  observacoes?: string
}
```

---

## 🛠️ Desenvolvimento

### Comandos Úteis

```bash
# Desenvolvimento
pnpm start:dev

# Build
pnpm build

# Prisma Studio (visualizar banco)
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset
```

---

## 🚢 Deploy

### Para Produção (PostgreSQL)

1. Alterar em `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Atualizar `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

3. Executar migrações:
```bash
npx prisma migrate deploy
```
