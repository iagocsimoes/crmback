const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const XLSX = require('xlsx');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // 1. Criar usuários
  console.log('👤 Criando usuários...');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      nome: 'Admin',
      email: 'admin@crm.com',
      senha: hashedPassword,
      role: 'ADMIN',
      ativo: true,
    },
  });

  const henrique = await prisma.user.create({
    data: {
      nome: 'Henrique Gasparini',
      email: 'henrique.gasparini@crm.com',
      senha: await bcrypt.hash('henrique123', 10),
      role: 'VENDEDOR',
      ativo: true,
    },
  });

  const wander = await prisma.user.create({
    data: {
      nome: 'Wander Miranda',
      email: 'wander.miranda@crm.com',
      senha: await bcrypt.hash('wander123', 10),
      role: 'VENDEDOR',
      ativo: true,
    },
  });

  console.log(`✅ Criados 3 usuários: ${admin.nome}, ${henrique.nome}, ${wander.nome}\n`);

  // 2. Criar estágios do pipeline
  console.log('📊 Criando estágios do pipeline...');
  const estagios = [
    { nome: 'Novo Lead', ordem: 1, cor: '#3B82F6' },
    { nome: 'Contato Inicial', ordem: 2, cor: '#8B5CF6' },
    { nome: 'Qualificação', ordem: 3, cor: '#EC4899' },
    { nome: 'Apresentação', ordem: 4, cor: '#F59E0B' },
    { nome: 'Proposta', ordem: 5, cor: '#10B981' },
    { nome: 'Negociação', ordem: 6, cor: '#14B8A6' },
    { nome: 'Fechamento', ordem: 7, cor: '#22C55E' },
    { nome: 'Pós-Venda', ordem: 8, cor: '#6366F1' },
  ];

  const estagiosCriados = [];
  for (const estagio of estagios) {
    const criado = await prisma.estagio.create({ data: estagio });
    estagiosCriados.push(criado);
  }
  console.log(`✅ Criados ${estagiosCriados.length} estágios\n`);

  // 3. Criar unidades do empreendimento
  console.log('🏢 Criando unidades do empreendimento...');
  const unidades = [];
  for (let i = 1; i <= 32; i++) {
    const unidade = await prisma.imovel.create({
      data: {
        identificacao: `UN-${String(i).padStart(3, '0')}`,
        status: 'DISPONIVEL',
        vgv: 350000 + (i * 5000), // VGV variando entre 355k e 510k
        descricao: `Unidade ${i} - Vert Manguinhos`,
        tipo: 'APARTAMENTO',
        metragem: 45 + (i % 3) * 5, // 45m², 50m² ou 55m²
        quartos: 2,
        vagas: 1,
      },
    });
    unidades.push(unidade);
  }
  console.log(`✅ Criadas ${unidades.length} unidades\n`);

  // 4. Importar clientes e negociações do Excel
  console.log('📑 Importando dados do Excel...');
  const excelPath = path.join(__dirname, '..', 'VERTMANGUINHOS CRM.xlsx');
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Remover as 2 primeiras linhas (cabeçalhos)
  const rows = data.slice(2);

  console.log(`📊 Encontradas ${rows.length} linhas no Excel\n`);

  let clientesCriados = 0;
  let negociacoesCriadas = 0;

  for (const row of rows) {
    try {
      if (!row || row.length === 0 || !row[3]) continue; // Pular linhas vazias

      const nome = row[3]?.toString().trim();
      if (!nome) continue;

      // Criar cliente
      const cliente = await prisma.cliente.create({
        data: {
          nome: nome,
          telefone: row[15]?.toString() || '',
          email: null,
          endereco: null,
          formaPagamento: row[14]?.toString() || null,
          origemLead: row[1]?.toString() || null,
          cpfCnpj: null,
          observacoes: row[13]?.toString() || null, // Motivação
        },
      });
      clientesCriados++;

      // Determinar estágio baseado nas colunas preenchidas
      let estagio = estagiosCriados[0]; // Default: Novo Lead

      if (row[11]) { // Coluna "Assinado"
        estagio = estagiosCriados.find(e => e.nome === 'Pós-Venda') || estagiosCriados[7];
      } else if (row[9]) { // Coluna "Fechado (Reserva)"
        estagio = estagiosCriados.find(e => e.nome === 'Fechamento') || estagiosCriados[6];
      } else if (row[7]) { // Coluna "Pré Reserva"
        estagio = estagiosCriados.find(e => e.nome === 'Negociação') || estagiosCriados[5];
      } else if (row[5]) { // Coluna "Negociação"
        estagio = estagiosCriados.find(e => e.nome === 'Proposta') || estagiosCriados[4];
      } else if (row[4]) { // Coluna "Reunião"
        estagio = estagiosCriados.find(e => e.nome === 'Apresentação') || estagiosCriados[3];
      } else if (row[3]) { // Coluna "Prospecção"
        estagio = estagiosCriados.find(e => e.nome === 'Qualificação') || estagiosCriados[2];
      }

      // Selecionar unidade disponível
      const unidadeDisponivel = unidades.find(u => u.status === 'DISPONIVEL');

      if (unidadeDisponivel) {
        // Valor: pegar da coluna do estágio atual (coluna 8, 10 ou 12) ou VGV da unidade
        const valor = row[12] || row[10] || row[8] || unidadeDisponivel.vgv;

        // Criar negociação
        const negociacao = await prisma.negociacao.create({
          data: {
            clienteId: cliente.id,
            imovelId: unidadeDisponivel.id,
            estagioId: estagio.id,
            valor: typeof valor === 'number' ? valor : unidadeDisponivel.vgv,
            observacoes: row[13]?.toString() || null,
          },
        });
        negociacoesCriadas++;

        // Atualizar status da unidade
        await prisma.imovel.update({
          where: { id: unidadeDisponivel.id },
          data: { status: 'PRE_RESERVA' },
        });
      }

      console.log(`✅ ${cliente.nome} - ${estagio.nome}`);
    } catch (error) {
      console.error(`❌ Erro ao processar linha: ${error.message}`);
    }
  }

  console.log(`\n✅ Importação concluída:`);
  console.log(`   - ${clientesCriados} clientes criados`);
  console.log(`   - ${negociacoesCriadas} negociações criadas\n`);

  console.log('🎉 Seed concluído com sucesso!\n');
  console.log('📝 Credenciais de acesso:');
  console.log('   Admin: admin@crm.com / admin123');
  console.log('   Henrique: henrique.gasparini@crm.com / henrique123');
  console.log('   Wander: wander.miranda@crm.com / wander123\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
