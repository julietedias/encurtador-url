# Encurtador de URLs - API

API RESTful desenvolvida em Node.js com NestJS para encurtamento de URLs, como parte de um teste de habilidade técnica.

## Funcionalidades Implementadas

- **Cadastro de Usuários:** Endpoint `POST /users` para registrar novos usuários.
- **Encurtamento de URL:** Endpoint `POST /urls` que permite que usuários (autenticados ou anônimos) enviem uma URL longa para receber uma versão encurtada.
- **Redirecionamento:** Endpoint `GET /:shortCode` que redireciona para a URL original e contabiliza o clique.

**Nota:** As funcionalidades de autenticação (login), listagem, edição e exclusão de URLs por usuário autenticado foram planejadas mas não implementadas devido ao tempo limite do teste. A estrutura de autenticação (decorator `GetUser`) e os relacionamentos no banco de dados estão prontos para recebê-las.

## Tecnologias Utilizadas

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
    git clone <url-do-seu-repositorio>
    cd <nome-do-repositorio>
    ```

2.  **Configure as Variáveis de Ambiente**
    Crie uma cópia do arquivo de exemplo `.env.example` e nomeie-a `.env`.

    ```bash
    cp .env.example .env
    ```

    _Observação: As variáveis no `.env.example` já estão configuradas para o ambiente Docker. Para produção, o `JWT_SECRET` deve ser alterado._

3.  **Suba os Contêineres**
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

### Acessando o Banco

Você pode acessar o banco de dados PostgreSQL que está rodando no Docker para verificar os registros.

**1. Via Ferramenta Gráfica (DBeaver, DataGrip, etc.)**
Use as seguintes credenciais de conexão:

- **Host:** `localhost`
- **Porta:** `5432`
- **Usuário:** `postgres`
- **Senha:** `postgres`
- **Banco de Dados:** `shortener`

**2. Via Linha de Comando**
Com o projeto em execução, rode o seguinte comando no seu terminal:

````bash
docker compose exec db psql -U postgres -d shortener
Dentro do psql, você pode usar comandos como \d para listar tabelas ou SELECT * FROM users; para ver os dados. Use \q para sair.
```bash
````
