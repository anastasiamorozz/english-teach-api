FROM node:18.17.0

EXPOSE 8080

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

CMD ["sh", "-c", "service postgresql start && node index.js"]