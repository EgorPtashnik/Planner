FROM node:22

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4004

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run deploy

EXPOSE 4004

CMD ["sh", "-c", "npx cds-serve --port ${PORT:-4004}"]