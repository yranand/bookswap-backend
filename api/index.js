require('dotenv').config();
const { Pool } = require('pg');

// Create a singleton Pool to be reused across invocations in the same container
let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      ssl: { rejectUnauthorized: false }
    });
  }
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


