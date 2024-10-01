const { Pool } = require('pg');
require('dotenv').config();  

// Criar o pool de conexão ao PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function getGeolocationDataFromDb() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM geolocation_data');
    client.release();
    return res.rows;
  } catch (err) {
    console.error('Erro ao consultar dados:', err);
    throw err;
  }
}

module.exports = {
  getGeolocationDataFromDb,
};
