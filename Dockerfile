# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate

# Stage 2: Serve static files  
FROM nginx:alpine

# Lösche die default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Kopiere deine Nuxt files
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Eigene nginx config kopieren
# COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]