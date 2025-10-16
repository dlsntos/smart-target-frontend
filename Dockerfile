FROM node:20-alpine

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ 

COPY package*.json ./
RUN npm install
RUN npm rebuild esbuild

COPY . .

RUN npm run build

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

