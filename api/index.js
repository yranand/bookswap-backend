require('dotenv').config();
const { Pool } = require('pg');

// Create a singleton Pool to be reused across invocations in the same container
let pool;
function getPool() {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL
    || process.env.POSTGRES_URL
    || process.env.POSTGRES_PRISMA_URL;

  // If a full connection string is provided, use it
  if (databaseUrl) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false }
    });
    return pool;
  }

  // Fallback to individual params. Guard against someone putting a URL in DB_HOST
  const dbHost = process.env.DB_HOST;
  const looksLikeUrl = dbHost && /^(postgres(?:ql)?:\/\/)/i.test(dbHost);
  if (looksLikeUrl) {
    pool = new Pool({
      connectionString: dbHost,
      ssl: { rejectUnauthorized: false }
    });
    return pool;
  }

  // If nothing provided, fail fast with a helpful error
  if (!databaseUrl && !dbHost) {
    throw new Error('Missing database configuration. Provide DATABASE_URL or DB_HOST/DB_USER/DB_PASS/DB_NAME.');
  }

  // Prevent localhost usage in serverless
  if (dbHost && /^(localhost|127\.0\.0\.1)$/i.test(dbHost)) {
    throw new Error('DB_HOST points to localhost. Use a remote Postgres when running on Vercel.');
  }

  pool = new Pool({
    host: dbHost,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    ssl: { rejectUnauthorized: false }
  });
  return pool;
}

async function handler(req, res) {
  const poolInstance = getPool();
  let client;
  try {
    client = await poolInstance.connect();
    // Test query; replace with your actual logic
    const result = await client.query('SELECT NOW() as now');
    return res.status(200).json({ ok: true, now: result.rows[0].now });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  } finally {
    if (client) client.release();
  }
}

module.exports = handler;
module.exports.default = handler;


