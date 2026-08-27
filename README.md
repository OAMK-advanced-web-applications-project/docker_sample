# Docker Full-Stack Example

This project is a beginner-friendly example of running a full-stack application with **Docker Compose**.

It contains three services:

- **Frontend** — React + Vite
- **Backend** — Node.js + Express
- **Database** — PostgreSQL

```text
Browser
   │
   ▼
Frontend :5173
   │
   ▼
Backend :3000
   │
   ▼
PostgreSQL :5432
```

Docker Compose starts and connects all three services.

---

## Requirements

Install:

- Git
- Docker Desktop

### Important: start Docker Desktop

Docker Desktop must be running before you use Docker commands.

You can check it with:

```bash
docker version
```

You should see information about both **Client** and **Server**.

If Windows shows an error similar to:

```text
open //./pipe/dockerDesktopLinuxEngine:
The system cannot find the file specified.
```

start Docker Desktop and wait until Docker is running.

---

## Clone the project

```bash
git clone https://github.com/OAMK-advanced-web-applications-project/docker_sample.git
cd docker_sample
git switch updated-docker
```

---

## Create `.env`

The repository contains `.env.example`.

Create your own `.env` file from it.

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### Linux/macOS

```bash
cp .env.example .env
```

Do not commit `.env` to Git.

---

## Start the application

Make sure Docker Desktop is running.

Then run:

```bash
docker compose up --build
```

The first start may take some time because Docker needs to download images and install dependencies.

When the services have started, open:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
Health:   http://localhost:3000/api/health
```

---

## Check container status

Open another terminal and run:

```bash
docker compose ps
```

You should see three services:

```text
frontend
backend
database
```

The `backend` and `database` services should eventually show as healthy.

---

## How the containers communicate

The backend connects to PostgreSQL using:

```text
database:5432
```

not:

```text
localhost:5432
```

Inside Docker Compose, the service name `database` acts as the hostname.

From your own computer, PostgreSQL is available at:

```text
localhost:5432
```

For example, pgAdmin can use:

```text
Host: localhost
Port: 5432
Database: mydb
Username: postgres
Password: root
```

---

## Stop the application

Stop and remove the containers:

```bash
docker compose down
```

The PostgreSQL data remains stored in a Docker volume.

To also delete the database volume:

```bash
docker compose down -v
```

Be careful: `-v` deletes the database data.

---

## View logs

All services:

```bash
docker compose logs
```

Backend:

```bash
docker compose logs backend
```

Database:

```bash
docker compose logs database
```

Follow logs continuously:

```bash
docker compose logs -f
```

---

## Common problems

### Docker cannot connect

Make sure Docker Desktop is running.

Check:

```bash
docker version
```

---

### A service does not start

Check:

```bash
docker compose ps
docker compose logs
```

For example:

```bash
docker compose logs backend
docker compose logs database
```

---

### Port 5432 is already in use

Another PostgreSQL installation may already be using port 5432.

Change this in `.env`:

```env
DB_EXPOSED_PORT=5433
```

Then pgAdmin should connect to:

```text
localhost:5433
```

The backend still uses:

```text
database:5432
```

---

### I changed `init.sql`, but nothing changed

`init.sql` is normally executed only when PostgreSQL creates a new database volume.

To create a fresh database:

```bash
docker compose down -v
docker compose up
```

Warning: this deletes existing database data.

---

## Basic Docker concepts used in this example

- **Dockerfile** — instructions for building an image
- **Image** — template used to create containers
- **Container** — running application environment
- **Docker Compose** — manages multiple containers
- **Port mapping** — exposes a container service to your computer
- **Volume** — stores persistent data
- **Bind mount** — makes local source files available inside a container
- **Healthcheck** — checks whether a service is ready
- **Service name** — allows containers to find each other, for example `database`

More detailed explanations and exercises are provided separately in the course material.