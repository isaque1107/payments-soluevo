# Set the base image
FROM node:18-alpine AS base
WORKDIR /app

# Set the build image
FROM node:18-alpine AS build
WORKDIR /source
COPY . .

# Build the application
RUN npm install
RUN npm run build

# Set the final image
FROM base AS final
WORKDIR /app

# Copiar os arquivos da build
COPY --from=build /source/dist ./dist
COPY --from=build /source/node_modules ./node_modules
COPY --from=build /source/package.json ./

COPY .env .env

# Start the application
ENTRYPOINT ["npm", "start"]
