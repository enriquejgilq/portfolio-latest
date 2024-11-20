FROM node:20

# Crear el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install
COPY . .

# Argumento para la URL de MongoDB
ARG BD_MONGO_URL
ENV BD_MONGO_URL=$BD_MONGO_URL

# Exponer el puerto y ejecutar la aplicación
EXPOSE 5173
CMD ["npm", "start"]
