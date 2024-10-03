const express = require('express');
const { getGeolocationDataFromDb } = require('./db');  
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Geolocalização',
      version: '1.0.0',
      description: 'API para buscar e armazenar dados de geolocalização',
    },
    servers: [
      {
        url: `http://localhost:${port}`,  
      },
    ],
  },
  apis: [__filename], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Geolocalização! Acesse /api/geolocation para os dados ou /api-docs para a documentação.');
});

// Rota para obter os dados de geolocalização do banco
/**
 * @swagger
 * /api/geolocation:
 *   get:
 *     summary: Retorna os dados de geolocalização
 *     description: Retorna uma lista de dados de geolocalização armazenados no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de geolocalizações.
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
});
