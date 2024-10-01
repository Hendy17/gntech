# Projeto de Geolocalização com Node.js, OpenCage API e PostgreSQL

Este projeto tem como objetivo realizar a extração de dados de geolocalização utilizando a API do [OpenCage](https://opencagedata.com/), armazenar os dados em um banco de dados PostgreSQL e fornecer uma API para consulta desses dados.

## Estrutura do Projeto

gntech/ ├── node_modules/ ├── src/ │ ├── index.js # Arquivo principal para extração de dados da API OpenCage e inserção no banco │ ├── server.js # Servidor Express para fornecer API RESTful │ ├── db.js # Arquivo para conexão e operações com o banco de dados PostgreSQL ├── .env # Arquivo com variáveis de ambiente (não incluído no repositório) ├── .gitignore # Arquivo para ignorar arquivos sensíveis ├── package.json # Dependências do projeto └── README.md # Instruções e informações sobre o projeto


## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (ou use um banco de dados local)
- Uma conta no [OpenCage Data](https://opencagedata.com/), para obter a chave de API

## Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/seu_usuario/seu_repositorio.git
cd seu_repositorio
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
### 5. Executar o projeto
Extração de dados da API OpenCage e inserção no banco de dados
Para buscar a geolocalização de uma cidade e salvar os dados no banco de dados, execute:
```bash
node src/index.js
```
Isso buscará a geolocalização de uma cidade especificada no código e armazenará os dados no banco de dados PostgreSQL.

Executar a API RESTful
Para fornecer os dados armazenados via uma API, execute o servidor Express:
```bash
npm start
```
A API estará disponível em http://localhost:3000/api/geolocation, onde você poderá consultar os dados armazenados no banco de dados.

### Controle de Versão
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
