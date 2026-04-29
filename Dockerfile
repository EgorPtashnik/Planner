FROM node:22

WORKDIR /app
COPY . /app
RUN npm install && npm run deploy

EXPOSE 4004

RUN npm start