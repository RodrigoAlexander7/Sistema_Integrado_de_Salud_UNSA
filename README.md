
# Sistema de Administracion de Historias Clinicas 

El presente proyecto presenta un sistema de administracion de historias clinicas para una universidad desarrollada para servir en la web.

# 🏥 Sistema Integrado de Salud - UNSA

Este proyecto está dividido en dos partes:
- **Frontend:** Hecho con React, Vite, Tailwind CSS y shadcn/ui.
- **Backend:** Node.js + Express + Prisma + PostgreSQL.
- Todo está desarrollado en **TypeScript**.

---

## ⚙️ Requisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión recomendada: `>=18`)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

---

## 🚀 Instalación del proyecto

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instala dependencias del frontend
```bash
cd frontend
npm install
```

### 3. Instala dependencias del backend
```bash
cd ../backend
npm install
```

---

## 🧪 Configuración

### Backend - Variables de entorno

Crea un archivo `.env` dentro de `backend/` con el siguiente contenido:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_basededatos"
```

Reemplaza `usuario`, `contraseña` y `mi_basededatos` con los valores reales de tu configuración local de PostgreSQL.

### 🛠️ Prisma

Después de configurar el archivo `.env`, ejecuta los siguientes comandos:

```bash
npx prisma generate
npx prisma migrate dev
```

Esto generará el cliente de Prisma y aplicará las migraciones a tu base de datos local.

---

## 🖥️ Cómo iniciar el proyecto

### Iniciar el Backend
```bash
cd backend
npm run dev
```

### Iniciar el Frontend
En otra terminal:
```bash
cd frontend
npm run dev
```

<<<<<<< HEAD
=======
### Iniciar en Docker (Opcion 2)
En terminal:
```bash
docker-compose up --build
```

>>>>>>> 9ef602bc127159a608b6db3113d911e72ed45397
---

## 📂 Estructura del proyecto

```
├── backend       # API REST con Express, Prisma y PostgreSQL
└── frontend      # Cliente web con React, Vite, Tailwind CSS, shadcn/ui
```

---

## 🧾 Scripts útiles

### Backend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor con nodemon |
| `npx prisma migrate dev` | Ejecuta migraciones |
| `npx prisma studio` | Abre el panel visual para ver la BD |

---

## 💡 Notas adicionales

- Este proyecto usa TypeScript tanto en el frontend como en el backend.
- Tailwind CSS y PostCSS ya están correctamente configurados.
- Si tenés problemas al correr el proyecto, revisá las versiones de Node y PostgreSQL.

---

## 🧑‍💻 Autores

Desarrollado por 

- **Rodrygo** — [GitHub](https://github.com/RdrigoFH)
- **Miguel** — [GitHub](https://github.com/rodry/faltaeditar/waaaaaaaaa)
- **Eduardo** — [GitHub](https://github.com/rodry/faltaeditar/waaaaaaaaa)
<<<<<<< HEAD
- **Mathias** — [GitHub](https://github.com/rodry/faltaeditar/waaaaaaaaa)
=======
- **Mathias** — [GitHub](https://github.com/rodry/faltaeditar/waaaaaaaaa)
>>>>>>> 9ef602bc127159a608b6db3113d911e72ed45397
