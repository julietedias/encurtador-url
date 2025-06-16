# Encurtador de URLs - API

API REST desenvolvida em Node.js com NestJS para encurtamento de URLs.

## Funcionalidades implementadas

- **Cadastro de usuários:** Endpoint `POST /users` para registrar novos usuários.
- **Encurtamento de URL:** Endpoint `POST /urls` que permite que usuários enviem uma URL longa para receber uma versão encurtada.
- **Redirecionamento:** Endpoint `GET /:shortCode` que redireciona para a URL original e contabiliza o clique.

**Nota:** As funcionalidades de autenticação, listagem, edição e exclusão de URLs por usuário autenticado foram planejadas mas não implementadas. A estrutura de autenticação (decorator `GetUser`) e os relacionamentos no banco de dados estão prontos para recebê-las.

## Tecnologias utilizadas

- **Node.js** (v22)
- **NestJS** Framework
- **TypeScript**
- **Docker** & **Docker Compose**
- **PostgreSQL** para o banco de dados
- **TypeORM** como ORM

---

## Como Rodar o Projeto

### Pré-requisitos

- **Docker**
- **Docker Compose**

Certifique-se de que o Docker esteja em execução na sua máquina.

### Passo a Passo

1.  **Clone o Repositório**

    ```bash
    git clone https://github.com/julietedias/encurtador-url.git
    cd encurtador-url
    ```

2.  **Configure as variáveis de ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.example` e renomeie como `.env`.

    ```bash
    cp .env.example .env
    ```

    _Observação: As variáveis no `.env.example` já estão configuradas para o ambiente Docker. Para produção, o `JWT_SECRET` deve ser alterado._

3.  **Suba os contêineres:**
    Execute o seguinte comando para construir as imagens e iniciar os serviços em segundo plano:

    ```bash
    docker compose up --build -d
    ```

A API estará disponível em `http://localhost:3000`.

---

## Banco de Dados

### Estrutura

O projeto utiliza a abordagem **Code-First** com o TypeORM. A estrutura das tabelas é definida através das classes de Entidade em `src/**/*.entity.ts`. A criação do schema no banco é feita automaticamente ao iniciar o ambiente de desenvolvimento (`synchronize: true`).

Um arquivo `schema.sql` com os comandos `CREATE TABLE` está incluído neste repositório para referência e documentação da estrutura projetada.

### Acessando o banco

Você pode acessar o banco de dados PostgreSQL que está rodando no Docker para verificar os registros.

**1. Via linha de comando:**
Com os contêineres em execução, rode o seguinte comando no seu terminal:

````bash
docker compose exec db psql -U postgres -d shortener
````
Dentro do psql, você pode usar comandos como `\d` para listar tabelas ou `SELECT * FROM users;` para ver os dados. Use `\q` para sair.

**2. Via ferramenta gráfica (DBeaver, por exemplo):**
Use as seguintes credenciais de conexão:

- **Host:** `localhost`
- **Porta:** `5432`
- **Usuário:** `postgres`
- **Senha:** `postgres`
- **Banco de Dados:** `shortener`

