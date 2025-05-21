-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('MEDICO', 'ENFERMERA');

-- CreateEnum
CREATE TYPE "TipoDiagnostico" AS ENUM ('PRINCIPAL', 'SECUNDARIO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "contrasena_hash" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,
    "email" TEXT NOT NULL,
    "ultimo_acceso" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_documento" TEXT NOT NULL,
    "num_documento" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "num_licencia" TEXT NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enfermeras" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_documento" TEXT NOT NULL,
    "num_documento" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "num_licencia" TEXT NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "enfermeras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facultades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "facultades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programas_academicos" (
    "id" SERIAL NOT NULL,
    "facultad_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT,
    "nivel" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "programas_academicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sedes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,
    "horario_atencion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sedes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultorios" (
    "id" SERIAL NOT NULL,
    "sede_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "consultorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especialidades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "codigo" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medico_especialidad" (
    "id" SERIAL NOT NULL,
    "medico_id" INTEGER NOT NULL,
    "especialidad_id" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "medico_especialidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" SERIAL NOT NULL,
    "tipo_documento" TEXT NOT NULL,
    "num_documento" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "genero" CHAR(1) NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "correo" TEXT,
    "grupo_sanguineo" TEXT,
    "alergias" TEXT,
    "antecedentes_familiares" TEXT,
    "estado_civil" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "programa_academico_id" INTEGER NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactos_emergencia" (
    "id" SERIAL NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "parentesco" TEXT NOT NULL,
    "telefono_principal" TEXT NOT NULL,
    "telefono_secundario" TEXT,
    "direccion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "contactos_emergencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historias_clinicas" (
    "id" SERIAL NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "fecha_apertura" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "observaciones_generales" TEXT,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historias_clinicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodios_clinicos" (
    "id" SERIAL NOT NULL,
    "historia_clinica_id" INTEGER NOT NULL,
    "especialidad_id" INTEGER NOT NULL,
    "medico_id" INTEGER,
    "enfermera_id" INTEGER NOT NULL,
    "consultorio_id" INTEGER NOT NULL,
    "fecha_episodio" TIMESTAMP(3) NOT NULL,
    "motivo_consulta" TEXT NOT NULL,
    "sintomas" TEXT,
    "tratamiento" TEXT,
    "observaciones" TEXT,

    CONSTRAINT "episodios_clinicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signos_vitales" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "presion_arterial" TEXT,
    "temperatura" DECIMAL(4,1),
    "frecuencia_cardiaca" INTEGER,
    "frecuencia_respiratoria" INTEGER,
    "saturacion_oxigeno" DECIMAL(4,1),
    "peso" DECIMAL(5,2),
    "altura" DECIMAL(3,2),
    "imc" DECIMAL(4,2),
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "signos_vitales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codigos_cie10" (
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "subcategoria" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "codigos_cie10_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "diagnosticos" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "codigo_cie10_id" TEXT NOT NULL,
    "tipo" "TipoDiagnostico" NOT NULL DEFAULT 'PRINCIPAL',
    "descripcion_adicional" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diagnosticos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescripciones" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "nombre_medicamento" TEXT NOT NULL,
    "dosis" TEXT NOT NULL,
    "via_administracion" TEXT NOT NULL,
    "frecuencia" TEXT NOT NULL,
    "duracion" TEXT NOT NULL,
    "indicaciones" TEXT,
    "fecha_prescripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prescripciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_clinicos" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "tipo_documento" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "ruta_archivo" TEXT NOT NULL,
    "contenido" BYTEA,
    "formato" TEXT NOT NULL,
    "fecha_documento" TIMESTAMP(3) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observaciones" TEXT,

    CONSTRAINT "documentos_clinicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consentimientos_informados" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "tipo_procedimiento" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_firma" TIMESTAMP(3),
    "firmado_paciente" BOOLEAN NOT NULL DEFAULT false,
    "firmado_representante" BOOLEAN NOT NULL DEFAULT false,
    "nombre_representante" TEXT,
    "documento_representante" TEXT,
    "documento_digitalizado" BYTEA,

    CONSTRAINT "consentimientos_informados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "odontologia_detalles" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "odontograma" BYTEA,
    "indice_cpod" DECIMAL(4,2),
    "observaciones_dentales" TEXT,
    "procedimientos_realizados" TEXT,

    CONSTRAINT "odontologia_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oftalmologia_detalles" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "agudeza_visual_od" TEXT,
    "agudeza_visual_oi" TEXT,
    "presion_intraocular_od" DECIMAL(4,1),
    "presion_intraocular_oi" DECIMAL(4,1),
    "fondo_ojo" TEXT,
    "formula_optica" TEXT,

    CONSTRAINT "oftalmologia_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psicologia_detalles" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "evaluacion_mental" TEXT,
    "test_aplicados" TEXT,
    "impresion_diagnostica" TEXT,
    "plan_intervencion" TEXT,
    "evolucion" TEXT,

    CONSTRAINT "psicologia_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trabajo_social_detalles" (
    "id" SERIAL NOT NULL,
    "episodio_clinico_id" INTEGER NOT NULL,
    "evaluacion_socioeconomica" TEXT,
    "dinamica_familiar" TEXT,
    "redes_apoyo" TEXT,
    "intervencion_realizada" TEXT,
    "seguimiento_caso" TEXT,

    CONSTRAINT "trabajo_social_detalles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_historias" (
    "id" SERIAL NOT NULL,
    "historia_clinica_id" INTEGER,
    "episodio_clinico_id" INTEGER,
    "usuario_id" INTEGER NOT NULL,
    "fecha_accion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_accion" TEXT NOT NULL,
    "descripcion" TEXT,
    "tabla_afectada" TEXT NOT NULL,
    "id_registro" INTEGER NOT NULL,
    "datos_antiguos" TEXT,
    "datos_nuevos" TEXT,
    "direccion_ip" TEXT NOT NULL,

    CONSTRAINT "auditoria_historias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nombre_usuario_key" ON "usuarios"("nombre_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_usuario_id_key" ON "medicos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_tipo_documento_num_documento_key" ON "medicos"("tipo_documento", "num_documento");

-- CreateIndex
CREATE UNIQUE INDEX "enfermeras_usuario_id_key" ON "enfermeras"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "enfermeras_tipo_documento_num_documento_key" ON "enfermeras"("tipo_documento", "num_documento");

-- CreateIndex
CREATE UNIQUE INDEX "facultades_codigo_key" ON "facultades"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "programas_academicos_codigo_key" ON "programas_academicos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "consultorios_sede_id_codigo_key" ON "consultorios"("sede_id", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_codigo_key" ON "especialidades"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "medico_especialidad_medico_id_especialidad_id_key" ON "medico_especialidad"("medico_id", "especialidad_id");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_tipo_documento_num_documento_key" ON "pacientes"("tipo_documento", "num_documento");

-- CreateIndex
CREATE UNIQUE INDEX "odontologia_detalles_episodio_clinico_id_key" ON "odontologia_detalles"("episodio_clinico_id");

-- CreateIndex
CREATE UNIQUE INDEX "oftalmologia_detalles_episodio_clinico_id_key" ON "oftalmologia_detalles"("episodio_clinico_id");

-- CreateIndex
CREATE UNIQUE INDEX "psicologia_detalles_episodio_clinico_id_key" ON "psicologia_detalles"("episodio_clinico_id");

-- CreateIndex
CREATE UNIQUE INDEX "trabajo_social_detalles_episodio_clinico_id_key" ON "trabajo_social_detalles"("episodio_clinico_id");

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enfermeras" ADD CONSTRAINT "enfermeras_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programas_academicos" ADD CONSTRAINT "programas_academicos_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "facultades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultorios" ADD CONSTRAINT "consultorios_sede_id_fkey" FOREIGN KEY ("sede_id") REFERENCES "sedes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medico_especialidad" ADD CONSTRAINT "medico_especialidad_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "medicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medico_especialidad" ADD CONSTRAINT "medico_especialidad_especialidad_id_fkey" FOREIGN KEY ("especialidad_id") REFERENCES "especialidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_programa_academico_id_fkey" FOREIGN KEY ("programa_academico_id") REFERENCES "programas_academicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contactos_emergencia" ADD CONSTRAINT "contactos_emergencia_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias_clinicas" ADD CONSTRAINT "historias_clinicas_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodios_clinicos" ADD CONSTRAINT "episodios_clinicos_historia_clinica_id_fkey" FOREIGN KEY ("historia_clinica_id") REFERENCES "historias_clinicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodios_clinicos" ADD CONSTRAINT "episodios_clinicos_especialidad_id_fkey" FOREIGN KEY ("especialidad_id") REFERENCES "especialidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodios_clinicos" ADD CONSTRAINT "episodios_clinicos_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "medicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodios_clinicos" ADD CONSTRAINT "episodios_clinicos_enfermera_id_fkey" FOREIGN KEY ("enfermera_id") REFERENCES "enfermeras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodios_clinicos" ADD CONSTRAINT "episodios_clinicos_consultorio_id_fkey" FOREIGN KEY ("consultorio_id") REFERENCES "consultorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signos_vitales" ADD CONSTRAINT "signos_vitales_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos" ADD CONSTRAINT "diagnosticos_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos" ADD CONSTRAINT "diagnosticos_codigo_cie10_id_fkey" FOREIGN KEY ("codigo_cie10_id") REFERENCES "codigos_cie10"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescripciones" ADD CONSTRAINT "prescripciones_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_clinicos" ADD CONSTRAINT "documentos_clinicos_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consentimientos_informados" ADD CONSTRAINT "consentimientos_informados_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "odontologia_detalles" ADD CONSTRAINT "odontologia_detalles_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oftalmologia_detalles" ADD CONSTRAINT "oftalmologia_detalles_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psicologia_detalles" ADD CONSTRAINT "psicologia_detalles_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trabajo_social_detalles" ADD CONSTRAINT "trabajo_social_detalles_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_historias" ADD CONSTRAINT "auditoria_historias_historia_clinica_id_fkey" FOREIGN KEY ("historia_clinica_id") REFERENCES "historias_clinicas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_historias" ADD CONSTRAINT "auditoria_historias_episodio_clinico_id_fkey" FOREIGN KEY ("episodio_clinico_id") REFERENCES "episodios_clinicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_historias" ADD CONSTRAINT "auditoria_historias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
