FROM node:18-alpine3.16

WORKDIR /appelerose

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

CMD [ "npm","run","start"]
