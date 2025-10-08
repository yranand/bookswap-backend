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

## Deploy to Vercel

This project is configured for Vercel serverless:

- `api/index.js` exports the Express app for Vercel
- `vercel.json` defines builds and routes

### Environment Variables on Vercel
Set these in the Vercel Project Settings → Environment Variables:

- `PORT` (optional) – Vercel sets this automatically
- `JWT_SECRET` – secret used for signing JWTs
- `DB_HOST` – MySQL host
- `DB_USER` – MySQL user
- `DB_PASS` – MySQL password
- `DB_NAME` – MySQL database name

### File uploads on Vercel
The `/uploads` folder is static at build time. Serverless functions cannot persist files. If you need persistent uploads in production, use an external storage (e.g. S3) and update the upload middleware to store to cloud instead of local disk.

### Local development
Use `npm start` which runs `server.js` to start the app and DB connection locally.

## Scripts
- `npm start` – start dev server with nodemon

## Tech
- Express, Sequelize (MySQL), JWT, bcrypt, Multer

## API Root
- `/api` – see routes under `routes/`


