# Home Library Service

This is a REST API for a home music library service. The application allows users to register, log in, and manage their collection of artists, albums, and tracks, as well as add them to their favorites.

---

## 🚀 Features

- CRUD operations for users, tracks, albums, and artists.
- "Favorites" system for adding beloved tracks, albums, and artists.
- Complete OpenAPI (Swagger) API specification.
- The application is fully containerized using Docker and Docker Compose.

---

## 🛠️ Tech Stack

- **Backend:** [NestJS](https://nestjs.com/), [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Containerization:** [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **Authentication:** [JWT](https://jwt.io/)

---

## ⚙️ Installation and Setup

To run this project on your machine, you need **Docker** and **Docker Desktop** installed.

#### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

#### 2. Create an environment file

Create a file named `.env` in the project's root folder. Copy the contents below into it and replace the values if necessary.

```
# Port for the application to run on
PORT=4000

# PostgreSQL connection variables
POSTGRES_HOST=postgres-db
POSTGRES_PORT=5432
POSTGRES_USER=testuser
POSTGRES_PASSWORD=testpassword
POSTGRES_DB=testdb

# Salt for password hashing
CRYPT_SALT=10

# Secret keys and expiration times for JWT tokens
JWT_SECRET_KEY=secret-key
JWT_SECRET_REFRESH_KEY=secret-refresh-key
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

#### 3. Run the application via Docker Compose

Execute a single command that will build the images, create, and run the containers for the application and the database:

```bash
docker compose up --build
```

The application will launch in hot-reload mode, and any changes in the `src` folder will automatically trigger a restart.

After a successful launch, the service will be available at `http://localhost:4000`.

---

## 🧪 Testing

To run tests, execute one of the following commands:

```bash

npm run test


npm run test:watch

npm run test:cov
```

---

## 🛡️ Vulnerability Scanning

To check dependencies for vulnerabilities, run the following command:

```bash
npm run scan
```

---

## 🐳 Docker Hub Image

The ready-to-use application image is available on Docker Hub and can be downloaded using the command:

```bash
docker pull antoninatyurina/home-library-service:1.0.0
```

full address: https://hub.docker.com/repositories/antoninatyurina
