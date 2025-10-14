-- AlterTable
ALTER TABLE "imoveis" ADD COLUMN "endereco" TEXT;
ALTER TABLE "imoveis" ADD COLUMN "valor" REAL;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_negociacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clienteId" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "estagioId" TEXT NOT NULL,
    "valor" REAL,
    "formaPagamento" TEXT,
    "valorEntrada" REAL,
    "numeroParcelas" INTEGER,
    "contratoAssinado" BOOLEAN NOT NULL DEFAULT false,
    "dataAssinatura" DATETIME,
    "dataVencimento" DATETIME,
    "observacoes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "negociacoes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "negociacoes_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "imoveis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "negociacoes_estagioId_fkey" FOREIGN KEY ("estagioId") REFERENCES "estagios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_negociacoes" ("clienteId", "createdAt", "estagioId", "id", "imovelId", "observacoes", "updatedAt", "valor") SELECT "clienteId", "createdAt", "estagioId", "id", "imovelId", "observacoes", "updatedAt", "valor" FROM "negociacoes";
DROP TABLE "negociacoes";
ALTER TABLE "new_negociacoes" RENAME TO "negociacoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
