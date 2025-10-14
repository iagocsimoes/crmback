const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando importação de dados...\n');

  // 1. Criar usuário admin
  console.log('👤 Criando usuário admin...');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@crm.com' },
    update: {},
    create: {
      nome: 'Admin',
      email: 'admin@crm.com',
      senha: hashedPassword,
      role: 'ADMIN',
      ativo: true,
    },
  });
  console.log('✅ Admin criado:', admin.email);

  // 2. Criar vendedores
  console.log('\n👥 Criando vendedores...');
  const henriquePassword = await bcrypt.hash('henrique123', 10);
  const wanderPassword = await bcrypt.hash('wander123', 10);

  const henrique = await prisma.user.upsert({
    where: { email: 'henrique.gasparini@crm.com' },
    update: {},
    create: {
      nome: 'Henrique Gasparini',
      email: 'henrique.gasparini@crm.com',
      senha: henriquePassword,
      role: 'VENDEDOR',
      ativo: true,
    },
  });

  const wander = await prisma.user.upsert({
    where: { email: 'wander.miranda@crm.com' },
    update: {},
    create: {
      nome: 'Wander Miranda',
      email: 'wander.miranda@crm.com',
      senha: wanderPassword,
      role: 'VENDEDOR',
      ativo: true,
    },
  });
  console.log('✅ Vendedores criados');

  // 3. Criar estágios do pipeline
  console.log('\n📊 Criando estágios do pipeline...');
  const estagios = [
    { nome: 'Prospecção', ordem: 1, cor: '#3B82F6' },
    { nome: 'Reunião', ordem: 2, cor: '#8B5CF6' },
    { nome: 'Negociação', ordem: 3, cor: '#F59E0B' },
    { nome: 'Pré Reserva', ordem: 4, cor: '#FB923C' },
    { nome: 'Fechado (Reserva)', ordem: 5, cor: '#10B981' },
    { nome: 'Assinado', ordem: 6, cor: '#059669' },
    { nome: 'GANHO', ordem: 7, cor: '#16A34A' },
    { nome: 'PERDIDO', ordem: 8, cor: '#EF4444' },
  ];

  const estagiosMap = {};
  for (const estagio of estagios) {
    const created = await prisma.estagio.upsert({
      where: { nome: estagio.nome },
      update: {},
      create: estagio,
    });
    estagiosMap[estagio.nome] = created.id;
  }
  console.log('✅ Estágios criados:', Object.keys(estagiosMap).length);

  // 4. Ler dados do Excel
  console.log('\n📄 Lendo dados do Excel...');
  const workbook = XLSX.readFile('VERTMANGUINHOS CRM.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  // Filtrar apenas linhas com dados válidos (ignorar cabeçalho e linhas vazias)
  const negociacoes = data.filter(row =>
    row['Pipeline de Vendas'] &&
    row['__EMPTY_1'] &&
    row['__EMPTY_2'] &&
    typeof row['Pipeline de Vendas'] === 'number' &&
    row['Pipeline de Vendas'] <= 32
  );

  console.log(`✅ ${negociacoes.length} negociações encontradas\n`);

  // 5. Criar imóveis (unidades do empreendimento)
  console.log('🏠 Criando imóveis...');
  const imoveisMap = {};

  for (let i = 1; i <= 32; i++) {
    const imovel = await prisma.imovel.upsert({
      where: { identificacao: `VERT-${i.toString().padStart(2, '0')}` },
      update: {},
      create: {
        identificacao: `VERT-${i.toString().padStart(2, '0')}`,
        status: 'DISPONIVEL',
        vgv: 2440000, // Valor médio das unidades
        descricao: `Unidade ${i} - Vert Manguinhos`,
        tipo: 'Apartamento',
        metragem: 120,
        quartos: 3,
        vagas: 2,
      },
    });
    imoveisMap[i] = imovel.id;
  }
  console.log('✅ 32 imóveis criados');

  // 6. Criar clientes e negociações
  console.log('\n💼 Criando clientes e negociações...');

  for (const row of negociacoes) {
    const num = row['Pipeline de Vendas'];
    const canalAquisicao = row['__EMPTY']?.trim();
    const vendedor = row['__EMPTY_1']?.trim();
    const nomeCliente = row['__EMPTY_2']?.trim();
    const motivacao = row['__EMPTY_12']?.trim() || '';
    const formaPagamento = row['__EMPTY_13']?.trim() || '';

    // Determinar em qual estágio está a negociação
    let estagioAtual = 'Prospecção';
    if (row['__EMPTY_10']) estagioAtual = 'Assinado';
    else if (row['__EMPTY_8']) estagioAtual = 'Fechado (Reserva)';
    else if (row['__EMPTY_6']) estagioAtual = 'Pré Reserva';
    else if (row['__EMPTY_4']) estagioAtual = 'Negociação';
    else if (row['__EMPTY_3']) estagioAtual = 'Reunião';

    // Valor da negociação
    const valor = row['__EMPTY_9'] || row['__EMPTY_7'] || row['__EMPTY_5'] || 2440000;

    // Criar cliente
    const telefone = `11${Math.floor(Math.random() * 900000000 + 100000000)}`;
    const email = `${nomeCliente.toLowerCase().replace(/\s+/g, '.').replace(/[^\w.]/g, '')}@email.com`;

    // Verificar se cliente já existe
    let cliente = await prisma.cliente.findFirst({
      where: { nome: nomeCliente }
    });

    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: {
          nome: nomeCliente,
          telefone: telefone,
          email: email,
          formaPagamento: formaPagamento || 'AVISTA',
          origemLead: canalAquisicao || 'Relacionamento',
          observacoes: `Motivação: ${motivacao}`,
        },
      });
    }

    // Criar negociação
    const negociacao = await prisma.negociacao.create({
      data: {
        clienteId: cliente.id,
        imovelId: imoveisMap[num],
        estagioId: estagiosMap[estagioAtual],
        valor: valor,
        observacoes: `Canal: ${canalAquisicao} | Vendedor: ${vendedor}`,
      },
    });

    // Atualizar status do imóvel baseado no estágio
    let novoStatus = 'DISPONIVEL';
    if (estagioAtual === 'Assinado' || estagioAtual === 'Fechado (Reserva)') {
      novoStatus = 'VENDIDO';
    } else if (estagioAtual === 'Pré Reserva') {
      novoStatus = 'PRE_RESERVA';
    }

    await prisma.imovel.update({
      where: { id: imoveisMap[num] },
      data: { status: novoStatus },
    });

    console.log(`✅ ${num}. ${nomeCliente} - ${estagioAtual}`);
  }

  console.log('\n🎉 Importação concluída com sucesso!');
  console.log('\n📊 Resumo:');
  console.log('- Usuários: 3 (1 admin + 2 vendedores)');
  console.log('- Estágios: 8');
  console.log('- Imóveis: 32');
  console.log('- Clientes:', negociacoes.length);
  console.log('- Negociações:', negociacoes.length);
  console.log('\n🔑 Credenciais de acesso:');
  console.log('Admin: admin@crm.com / admin123');
  console.log('Henrique: henrique.gasparini@crm.com / henrique123');
  console.log('Wander: wander.miranda@crm.com / wander123');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao importar dados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
