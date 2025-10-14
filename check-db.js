const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update the first negociacao with sample data
  await prisma.negociacao.update({
    where: { id: 'e1409640-8116-42d7-93d9-cfbbea33929e' },
    data: {
      formaPagamento: 'FINANCIADO',
      valorEntrada: 200000,
      numeroParcelas: 120,
      contratoAssinado: true,
      dataAssinatura: new Date('2025-10-05'),
      dataVencimento: new Date('2035-10-05'),
    }
  });

  // Update the cliente with email and phone
  await prisma.cliente.update({
    where: { id: 'cc5e8ac4-3461-40df-bac5-04961cf83f38' },
    data: {
      email: 'leve@example.com',
      telefone: '(21) 98765-4321',
      cpfCnpj: '123.456.789-00',
    }
  });

  // Update the imovel with valor and endereco
  await prisma.imovel.update({
    where: { id: '80cfebb7-f497-4995-88cd-69cf9cb06f16' },
    data: {
      valor: 355000,
      endereco: 'Rua das Flores, 123 - Manguinhos',
    }
  });

  console.log('Dados atualizados com sucesso!');
  await prisma.$disconnect();
}

main();
