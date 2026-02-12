# Brighte GraphQL API

A Node.js GraphQL API for managing leads with Prisma and MySQL, fully Dockerized for local development and testing.

---

## Features

- **GraphQL API** using Apollo Server  
- **Database**: MySQL 8.0  
- **ORM**: Prisma  
- **Logging**: Pino  
- **Validation and Errors**: Custom LeadError handling  
- **Testing**: Jest & ts-jest with TypeScript support  
- **Linting**: ESLint  
- **Dockerized** for easy local setup  

---

## Requirements

- Node.js >= 20  
- Docker & Docker Compose  
- npm or pnpm  

---

## Setup

1. ## Clone the repository

```bash
git clone 
cd project-brighte/api

```

2. ## Install dependencies

```bash
npm install

```

3. ## Copy .env.example to .env

4. ## Start the app and MySQL database

```bash
docker-compose up --build

```

5. ## Stop the containers

```bash
docker-compose down

```

