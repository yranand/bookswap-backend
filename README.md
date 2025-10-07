# BookSwap Marketplace – Backend

Simple Node.js + Express + MySQL (Sequelize) backend for BookSwap.

## Setup

1. Copy `.env.example` to `.env` and adjust values.
2. Install deps and run migrations.

```bash
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

## Scripts
- `npm start` – start dev server with nodemon

## Tech
- Express, Sequelize (MySQL), JWT, bcrypt, Multer

## API Root
- `/api` – see routes under `routes/`


