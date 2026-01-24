## Instruções para executar o projeto

### Pré-requisitos

Antes de começar, certifique-se de que os seguintes softwares estejam instalados em sua máquina:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Começando

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### 1. Clone o repositório

```bash
git clone https://github.com/PedroMarques391/junior-technical-assessment/
cd junior-technical-assessment
```

### 2. Instale as dependências

Execute o comando abaixo para instalar todas as dependências listadas no `package.json`:

```bash
npm install
```

### 3. Inicie o banco de dados

Este comando irá subir um container Docker com o banco de dados PostgreSQL:

```bash
npm run up:db
```

Esse script executa internamente o comando `docker compose up -d`.

### 4. Configure as variáveis de ambiente

O Prisma utiliza uma variável de ambiente para a URL de conexão com o banco de dados. Um exemplo está disponível no arquivo `.env.example` na raiz do projeto.

```bash
mv .env.example .env
```

Esse comando renomeia o arquivo. Após isso, edite o arquivo `.env` e ajuste os valores conforme necessário.

### 5. Gere o Prisma Client

O projeto utiliza o Prisma para interagir com o banco de dados. Após o banco estar em execução e o schema atualizado, é necessário gerar o Prisma Client:

```bash
npx prisma generate
```

### 6. Execute a aplicação

Agora você pode iniciar o servidor de desenvolvimento do Next.js:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador para visualizar a aplicação.

## Extra

Todas as rotas da API estão registradas no arquivo `Insomnia.yaml`.
Para testar rapidamente os endpoints, basta importar esse arquivo no Insomnia ou em qualquer outro API Client compatível.

## Informações do Banco de Dados

O banco de dados PostgreSQL é executado dentro de um container Docker. As configurações de conexão estão definidas no arquivo `docker-compose.yml`:

- **Host:** `localhost`
- **Porta:** `5433`
- **Usuário:** `postgres`
- **Senha:** `postgres`
- **Nome do Banco:** `postgres`

## Scripts disponíveis

Neste projeto, você pode executar os seguintes scripts:

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run start` — Inicia o servidor em modo produção
- `npm run lint` — Executa o linter para verificação de código
- `npm run up:db` — Sobe os containers Docker do banco
- `npm run down:db` — Encerra os containers Docker do banco
