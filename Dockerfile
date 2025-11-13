# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

# Nur das Nötigste kopieren
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.output ./.output/
COPY --from=builder /app/node_modules ./node_modules/

# Environment Variables setzen (wichtig für deine Baserow API)
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80

EXPOSE 80

# Nuxt Server starten
CMD ["node", ".output/server/index.mjs"]