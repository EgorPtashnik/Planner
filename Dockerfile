FROM node:22

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run deploy

EXPOSE 4004

CMD [ "npm", "start" ]