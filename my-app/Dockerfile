# my-app/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve the build with a static server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
