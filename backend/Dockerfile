FROM node:18-alpine

WORKDIR /app

COPY package.json .  
COPY package-lock.json . 
RUN npm install

COPY *.js .

RUN chown -R node:node /app  

USER node 

EXPOSE 3000

CMD ["node", "server.js"]