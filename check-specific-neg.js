const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Get the negociacao for cliente "Restaurante (Café Arrumado)"
  const negociacao = await prisma.negociacao.findFirst({
    where: {
      cliente: {
        nome: {
          contains: 'Restaurante'
        }
      }
    },
    include: {
      cliente: true,
      imovel: true,
      estagio: true
    }
  });

  console.log(JSON.stringify(negociacao, null, 2));
  await prisma.$disconnect();
}

main();
