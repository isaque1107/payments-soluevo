# Imagem baseada em Debian (evita problemas com rollup nativo)
FROM node:22

# Diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para iniciar o Vite em modo dev
CMD ["npm", "run", "dev"]
