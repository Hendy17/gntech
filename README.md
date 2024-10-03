# Projeto de Geolocalização com Node.js, OpenCage API e PostgreSQL

Este projeto tem como objetivo realizar a extração de dados de geolocalização utilizando a API do [OpenCage](https://opencagedata.com/), armazenar os dados em um banco de dados PostgreSQL e fornecer uma API para consulta desses dados.

## Estrutura do Projeto
```bash
gntech/
├── node_modules/
├── src/
│   ├── index.js           # Extrai e salva os dados de geolocalização
│   ├── server.js          # Servidor Express para fornecer a API RESTful
│   ├── db.js              # Conexão com PostgreSQL
├── .env                   # Variáveis de ambiente (API keys, credenciais)
├── .gitignore             # Arquivos ignorados pelo Git
├── Dockerfile             # Configuração do container para a aplicação Node.js
├── docker-compose.yml      # Orquestração dos containers Docker
├── package.json           # Dependências do projeto
└── README.md              # Instruções e informações sobre o projeto
```
### 2. Instalar dependências
Após clonar o projeto, execute o comando abaixo para instalar as dependências do Node.js:

```bash
npm install
```
### 3.Configurar o arquivo .env
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
API_KEY=coloque_sua_chave_aqui
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD= # Substitua pela sua senha do PostgreSQL
DB_NAME=geolocation_db
DB_PORT=5432
```

### 4. Configurar o banco de dados PostgreSQL 
Certifique-se de que o PostgreSQL está instalado e rodando na sua máquina ou servidor. Em seguida, crie o banco de dados e a tabela necessária:
```bash
CREATE DATABASE geolocation_db;

USE geolocation_db;

CREATE TABLE geolocation_data (
  id SERIAL PRIMARY KEY,
  city VARCHAR(50),
  latitude FLOAT,
  longitude FLOAT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 5. Usando Docker
O projeto está configurado para rodar dentro de containers Docker, tanto para a aplicação Node.js quanto para o PostgreSQL. Isso facilita a execução do código em qualquer máquina com Docker instalado.


```bash
node src/index.js
```
Isso buscará a geolocalização de uma cidade especificada no código e armazenará os dados no banco de dados PostgreSQL.

### 5.1. Subir os containers com Docker 
Para rodar o projeto com Docker, execute o seguinte comando na raiz do projeto:
```bash
docker-compose up --build
```
Esse comando irá construir a imagem Docker da aplicação, configurar e subir o container PostgreSQL e a aplicação Node.js.

### 5.2. Acessar a aplicação e o banco de dados
A aplicação estará disponível em http://localhost:3001.

A API estará disponível em http://localhost:3001/api/geolocation.

### 5.3. Parar os containers
Se você quiser parar os containers, execute o comando:
```bash
docker-compose down
```
Esse comando irá parar e remover todos os containers criados pelo Docker Compose.

### 6. Executar o projeto sem Docker
Se preferir executar o projeto sem Docker, você ainda pode rodá-lo manualmente:

### 6.1. Extração de dados da API OpenCage e inserção no banco de dados
Para buscar a geolocalização de uma cidade e salvar os dados no banco de dados, execute:

```bash
node src/index.js
```
Isso buscará a geolocalização de uma cidade especificada no código e armazenará os dados no banco de dados PostgreSQL.

### 6.2. Executar a API RESTful 
Para fornecer os dados armazenados via uma API, execute o servidor Express:
```bash
npm start
```
A API estará disponível em http://localhost:3000/api/geolocation, onde você poderá consultar os dados armazenados no banco de dados.

### 7 Controle de Versão
Este projeto utiliza Git para controle de versão. Certifique-se de ter o .gitignore configurado corretamente para ignorar arquivos sensíveis, como o .env.
```bash
# Ignorar o arquivo .env
.env

# Ignorar a pasta node_modules
node_modules/
```

### Autor
Hëndy Vorpagél
@hendyvorpagel@gmail.com
