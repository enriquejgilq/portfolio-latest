FROM node:20.16.0

 WORKDIR /app

 COPY package*.json ./
RUN npm install
COPY . .

 ARG BD_MONGO_URL
ENV BD_MONGO_URL=$BD_MONGO_URL

 EXPOSE 3000
CMD ["npm", "start"]


##1esLinter
##2Unit test 
##3integration test  
##4Conectar al ec2 git pull 
##5migrations 
##6comando pm2 
## githubactions marketplace 