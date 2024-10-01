const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const city = 'São Paulo'; // Cidade ou endereço que você deseja buscar

// URL da API OpenCage com a chave e cidade como parâmetros
const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

async function getGeolocationData() {
  try {
    const response = await axios.get(url);
    const geoData = response.data;

    if (geoData.results && geoData.results.length > 0) {
      const location = geoData.results[0].geometry;
      console.log(`Geolocalização de ${city}:`);
      console.log(`Latitude: ${location.lat}`);
      console.log(`Longitude: ${location.lng}`);
    } else {
      console.log('Nenhuma localização encontrada.');
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
  }
}

getGeolocationData();
