FROM node:20.16.0

 WORKDIR /app

 COPY package*.json ./
RUN npm install
COPY . .

 ARG BD_MONGO_URL
ENV BD_MONGO_URL=$BD_MONGO_URL

 EXPOSE 3001
CMD ["npm", "start"]