# 🖼️ Payment Frontend

Frontend da aplicação de gerenciamento de pagamentos, desenvolvido com Vue 3 e Vuetify. Pode ser executado localmente ou via Docker.

---

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Docker (opcional, mas recomendado)
- `.env` com as variáveis necessárias (caso aplicável)

---

## 🖥️ Sem Docker

### 📦 Instalar dependências

```sh
npm install
```

### 🚧 Executar em modo desenvolvimento (com hot reload)

```sh
npm run dev
```

O servidor de desenvolvimento será iniciado (por padrão na porta `5173`) com hot reload ativado para facilitar o desenvolvimento.

### 🚀 Gerar build de produção

```sh
npm run build
```

Esse comando irá compilar e minificar os arquivos da aplicação para uso em produção, normalmente gerando os arquivos na pasta `dist/`.

---

## 🐳 Utilizando Docker

### 📌 1. Build da imagem Docker

```sh
docker build -t container-payment-frontend .
```

Esse comando cria uma imagem Docker com base na sua aplicação Vue 3 + Vite + Vuetify.

### 📌 2. Rodar o container com a aplicação

```sh
docker run -it --rm -p 5173:5173 container-payment-frontend
```

> Certifique-se de que a porta `5173` está liberada e que o `vite.config.js` está configurado com:

```js
server: {
  host: true,
  port: 5173
}
```