FROM node:22

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run deploy

EXPOSE 8080

CMD [ "npm", "start" ]