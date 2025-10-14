const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update this specific negociacao
  await prisma.negociacao.update({
    where: { id: 'cca8769d-ecde-4fa6-94e3-782fb6bed201' },
    data: {
      formaPagamento: 'PARCELADO',
      valorEntrada: 100000,
      numeroParcelas: 60,
      contratoAssinado: false,
      observacoes: 'Cliente interessado em parcelamento direto com a construtora'
    }
  });

  // Update the cliente
  await prisma.cliente.update({
    where: { id: 'cc705a44-7c90-415d-a43f-39432958092b' },
    data: {
      email: 'contato@restaurantecafe.com.br',
      telefone: '(21) 3456-7890',
      cpfCnpj: '12.345.678/0001-90'
    }
  });

  console.log('Negociação do Restaurante atualizada!');
  await prisma.$disconnect();
}

main();
