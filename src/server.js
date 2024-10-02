const express = require('express');
const { getGeolocationDataFromDb } = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');  // Se estiver usando CORS

const app = express();
const port = 3000;

// Configurar CORS
app.use(cors());

// Configurações do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Geolocalização',
      version: '1.0.0',
      description: 'API para buscar e armazenar dados de geolocalização',
    },
  },
  apis: ['./src/server.js'], // Caminho para os comentários das rotas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota para obter os dados de geolocalização do banco
/**
 * @swagger
 * /api/geolocation:
 *   get:
 *     summary: Retorna os dados de geolocalização
 *     responses:
 *       200:
 *         description: Lista de geolocalizações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     example: São Paulo
 *                   latitude:
 *                     type: number
 *                     example: -23.55065
 *                   longitude:
 *                     type: number
 *                     example: -46.63338
 */
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
  console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
});
