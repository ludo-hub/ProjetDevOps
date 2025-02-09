FROM node:18-alpine

WORKDIR /app

COPY ./backend/package.json .  
COPY ./backend/package-lock.json . 
RUN npm install

COPY ./backend/*.js .

RUN chown -R node:node /app  

USER node 

EXPOSE 3000

CMD ["node", "server.js"]