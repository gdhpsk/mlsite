FROM node:22
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 3021
CMD yarn run start