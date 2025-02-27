# Dockerfile
FROM node:23-alpine3.21

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 5173

CMD ["npm", "run", "dev"]