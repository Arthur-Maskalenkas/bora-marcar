[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=Arthur-Maskalenkas_bora-marcar)

# Seja bem vindo ao Bora Marcar!

---

# Sobre

## O que é o Bora Marcar?

O Bora Marcar é um projeto que visa facilitar a vida de quem gosta de criar e participar de eventos. Com ele você pode criar um evento, convidar seus amigos e marcar a data.

## Como funciona?

Funciona a base de microsserviços, onde cada serviço é responsável por uma funcionalidade específica. O projeto é composto por 4 serviços:

- [Bora Marcar API](xxx): Responsável por gerenciar os eventos e convidados.

- [Bora Marcar Auth](xxx): Responsável por gerenciar a autenticação dos usuários.

- [Bora Marcar Front](xxx): Responsável por disponibilizar a interface gráfica para o usuário.

- [Bora Marcar Gateway](xxx): Responsável por disponibilizar uma API única para os serviços.

## O que foi criado até o momento?

- 🟡 API de eventos - Em andamento...
- 🔴 API Gateway - Aguardando a tarefa acima ser concluída.
- 🔴 API de autenticação - Aguardando a tarefa acima ser concluída.
- 🔴 Frontend - Aguardando a tarefa acima ser concluída.

---

# Utilidades

## No projeto você vai encontrar diversos principios e metodologias, como:

### Principios:
- Liskov Substitution Principle (LSP)
- Open Closed Principle (OCP)
- Interface Segregation Principle (ISP)
- Single Responsibility Principle (SRP)
- Dependency Inversion Principle (DIP)
- Separation of Concerns (SOC)
- Don't Repeat Yourself (DRY)
- Keep It Simple, Silly (KISS)
- You Aren't Gonna Need It (YAGNI)
- Composition Over Inheritance
- Small Commits

### Metodologias:
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- TDD
- Clean Architecture
- DDD
- GitFlow
- Use Cases

---

# Rodando o projeto

### Antes de mais nada, você precisa ter instalado em sua maquina:

- [Docker](https://www.docker.com/)

### Para rodar o projeto você precisa seguir os seguintes passos:

1. Clone o projeto
2. Crie um .env na raiz do projeto e preencha com as variaveis de ambiente do projeto mencionadas no arquivo .env.example
3. Rode o comando `npm install` para instalar as dependencias
4. Rode `npm run build` para buildar o projeto
5. Levante os containers com o comando `npm run docker:up`
    - O container vai levantar tanto a api quanto o banco de dados teste :)
6. Rode o comando `npm run start` para iniciar o projeto
7. Acesse a api através do endereço `http://localhost:5050/api`
8. Utilize o [manual da API](xxx) para utilizar as rotas