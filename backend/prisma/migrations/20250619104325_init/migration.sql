-- AlterEnum
ALTER TYPE "TipoUsuario" ADD VALUE 'ADMINISTRADOR';

-- CreateTable
CREATE TABLE "administradores" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_documento" TEXT NOT NULL,
    "num_documento" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "administradores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "administradores_usuario_id_key" ON "administradores"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "administradores_tipo_documento_num_documento_key" ON "administradores"("tipo_documento", "num_documento");

-- AddForeignKey
ALTER TABLE "administradores" ADD CONSTRAINT "administradores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
