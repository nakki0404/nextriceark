FROM node

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm install -g webpack webpack-cli

COPY . .

RUN npm run build


