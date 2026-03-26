FROM node:20-alphine as build
LABEL authors="xgao"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build