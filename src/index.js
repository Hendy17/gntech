const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const city = 'São Paulo';

const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function saveGeolocationToDb(city, latitude, longitude) {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO geolocation_data (city, latitude, longitude) VALUES ($1, $2, $3)';
    await client.query(query, [city, latitude, longitude]);
    client.release();
    console.log('Dados salvos no banco de dados.');
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
}

async function getGeolocationData() {
  try {
    const response = await axios.get(url);
    const geoData = response.data;

    if (geoData.results && geoData.results.length > 0) {
      const location = geoData.results[0].geometry;
      const latitude = location.lat;
      const longitude = location.lng;

      console.log(`Geolocalização de ${city}:`);
      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);

      
      await saveGeolocationToDb(city, latitude, longitude);
    } else {
      console.log('Nenhuma localização encontrada.');
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
  }
}

getGeolocationData();
