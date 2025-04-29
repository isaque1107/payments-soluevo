# 💳 Payment Backend API

API para gerenciamento de pagamentos, desenvolvida em Node.js.

---

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) v18+ (recomendado: v18 LTS ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Docker (opcional, mas recomendado para ambiente isolado)
- `.env` com as configurações necessárias

---

## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

---

## 🖥️ Desenvolvimento

Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

Esse comando iniciará o servidor local com suporte a recarregamento automático (hot reload), ideal para desenvolvimento.

---

## 🚀 Produção

Para rodar a aplicação em ambiente de produção:

```bash
npm run build
npm start
```

O comando `build` irá compilar a aplicação e o `start` iniciará o servidor com os arquivos transpilados.

---

## 🐳 Utilizando Docker

### 📌 1. Build da imagem

```bash
docker build -t payment-backend-api .
```

> Certifique-se de que o arquivo `.env` esteja no mesmo diretório do `Dockerfile` e **não esteja listado no `.dockerignore`**.

### 📌 2. Executar o container

```bash
docker run -d -p 3000:3000 --name container-payment-backend payment-backend-api
```

> Altere a porta `3000` se sua aplicação estiver configurada para outra.

---


## 🌐 Variáveis de Ambiente

Exemplo básico de `.env`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=supersecreto
```

> Adapte conforme as necessidades da sua aplicação.

---

## 📜 Scripts Disponíveis

| Script         | Descrição                              |
|----------------|------------------------------------------|
| `npm install`  | Instala as dependências do projeto       |
| `npm run dev`  | Executa a aplicação em modo desenvolvimento |
| `npm run build`| Compila os arquivos para produção        |
| `npm start`    | Inicia a aplicação em modo produção      |

---

## 🧾 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).

---


