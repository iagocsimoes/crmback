FROM node:18-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN pnpm build

# Expor porta
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
