FROM node:22

ENV NODE_ENV=production

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm run deploy

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]