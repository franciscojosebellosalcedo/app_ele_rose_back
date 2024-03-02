FROM node:18

WORKDIR /appelerose

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","start"]
