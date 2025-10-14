const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Get all negociacoes
  const negociacoes = await prisma.negociacao.findMany({
    take: 10
  });

  // Update each with different payment types
  const paymentTypes = ['AVISTA', 'FINANCIADO', 'PARCELADO', 'FINANCIADO'];

  for (let i = 0; i < Math.min(negociacoes.length, 10); i++) {
    const neg = negociacoes[i];
    const paymentType = paymentTypes[i % paymentTypes.length];

    const updateData = {
      formaPagamento: paymentType,
      contratoAssinado: i % 3 === 0, // Every 3rd is signed
    };

    if (paymentType === 'FINANCIADO') {
      updateData.valorEntrada = neg.valor ? neg.valor * 0.2 : 50000;
      updateData.numeroParcelas = 120;
    } else if (paymentType === 'PARCELADO') {
      updateData.valorEntrada = neg.valor ? neg.valor * 0.3 : 70000;
      updateData.numeroParcelas = 36;
    } else if (paymentType === 'AVISTA') {
      updateData.valorEntrada = neg.valor || 355000;
      updateData.numeroParcelas = null;
    }

    if (updateData.contratoAssinado) {
      updateData.dataAssinatura = new Date('2025-10-01');
      updateData.dataVencimento = new Date('2035-10-01');
    }

    await prisma.negociacao.update({
      where: { id: neg.id },
      data: updateData
    });
  }

  // Update some clientes with emails and phones
  const clientes = await prisma.cliente.findMany({ take: 10 });
  const domains = ['gmail.com', 'hotmail.com', 'outlook.com', 'example.com'];

  for (let i = 0; i < clientes.length; i++) {
    const cliente = clientes[i];
    const email = `${cliente.nome.toLowerCase().replace(/\s+/g, '.')}@${domains[i % domains.length]}`;
    const telefone = `(21) ${90000 + i}${1000 + i * 10}${-4321 + i}`;

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: {
        email,
        telefone,
        cpfCnpj: i % 2 === 0 ? `${100 + i}.${200 + i}.${300 + i}-${10 + i}` : `${10 + i}.${200 + i}.${300 + i}/0001-${10 + i}`
      }
    });
  }

  // Update some imoveis with valores and enderecos
  const imoveis = await prisma.imovel.findMany({ take: 10 });
  const streets = ['Rua das Flores', 'Av. Principal', 'Rua do Comércio', 'Av. Central'];

  for (let i = 0; i < imoveis.length; i++) {
    const imovel = imoveis[i];
    const street = streets[i % streets.length];

    await prisma.imovel.update({
      where: { id: imovel.id },
      data: {
        valor: imovel.vgv,
        endereco: `${street}, ${100 + i * 10} - Manguinhos`
      }
    });
  }

  console.log(`Atualizados: ${negociacoes.length} negociações, ${clientes.length} clientes, ${imoveis.length} imóveis`);
  await prisma.$disconnect();
}

main();
