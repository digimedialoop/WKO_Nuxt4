FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate

# Installiere einen einfachen HTTP Server
RUN npm install -g http-server

EXPOSE 80
CMD ["http-server", "dist", "-p", "80"]