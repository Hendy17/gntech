const express = require('express');
const { getGeolocationDataFromDb } = require('./db'); 

const app = express();
const port = 3000;

app.get('/api/geolocation', async (req, res) => {
  try {
    const data = await getGeolocationDataFromDb();  
    res.json(data);  
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
