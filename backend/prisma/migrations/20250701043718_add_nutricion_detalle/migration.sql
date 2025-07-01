-- CreateTable
CREATE TABLE "nutricion_detalles" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "evaluacion_nutricional" TEXT,
    "diagnostico_nutricional" TEXT,
    "plan_alimentario" TEXT,
    "seguimiento" TEXT,
    "imc" DECIMAL(4,2),

    CONSTRAINT "nutricion_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nutricion_detalles_episodio_clinico_id_key" ON "nutricion_detalles"("episodio_clinico_id");

-- AddForeignKey
ALTER TABLE "nutricion_detalles" ADD CONSTRAINT "nutricion_detalles_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
