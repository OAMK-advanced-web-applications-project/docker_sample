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
```

The Docker version of the project is now in the `master` branch, so no branch switching is needed.

---

## Create `.env`

The repository contains:

```text
.env.example
```

Create your own `.env` file from it.

### Option 1: File Explorer

This may be easiest if you are not comfortable using the terminal.

1. Open the project folder in File Explorer.
2. Make a copy of `.env.example`.
3. Rename the copy to:

```text
.env
```

Make sure the file is really named `.env` and not something like:

```text
.env.txt
```

### Option 2: Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### Option 3: Windows Command Prompt

```cmd
copy .env.example .env
```

### Option 4: Linux/macOS

```bash
cp .env.example .env
```

The project should now contain both:

```text
.env.example
.env
```

`.env.example` is stored in Git as an example configuration.

`.env` is your local configuration file and should **not** be committed to Git.

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

Open another terminal in the project directory and run:

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

You should see both Client and Server information.

---

### A service does not start

Check:

```bash
docker compose ps
```

Then inspect the logs:

```bash
docker compose logs
```

For example:

```bash
docker compose logs backend
docker compose logs database
```

---

### PostgreSQL port 5432 is already in use

If you already have PostgreSQL installed on your computer, it may already be using port `5432`.

Docker cannot use the same host port at the same time.

You have two options.

#### Option 1: Stop the local PostgreSQL service

On Windows:

1. Open the Start menu.
2. Search for:

```text
Services
```

3. Open the **Services** application.
4. Look for a PostgreSQL service, for example:

```text
postgresql-x64-17
postgresql-x64-18
```

The exact name depends on the installed PostgreSQL version.

5. Right-click the PostgreSQL service.
6. Select **Stop**.

After that, start the Docker application again:

```bash
docker compose up
```

You can start the local PostgreSQL service again later from the same Services application.

#### Option 2: Use another host port

Instead of stopping your locally installed PostgreSQL, change this in `.env`:

```env
DB_EXPOSED_PORT=5432
```

to:

```env
DB_EXPOSED_PORT=5433
```

Then restart the Docker application:

```bash
docker compose down
docker compose up
```

PostgreSQL inside Docker still listens on port:

```text
5432
```

but from your computer you now connect to:

```text
localhost:5433
```

For example, pgAdmin would use:

```text
Host: localhost
Port: 5433
Database: mydb
Username: postgres
Password: root
```

The backend does **not** need to change.

It still connects to:

```text
database:5432
```

because containers communicate using the internal Docker network.

---

### I changed `init.sql`, but nothing changed

`init.sql` is normally executed only when PostgreSQL creates a new database volume.

To create a fresh database:

```bash
docker compose down -v
docker compose up
```

Warning: this deletes the existing Docker database data.

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