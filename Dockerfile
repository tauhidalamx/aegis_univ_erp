# Stage 1: Build the Vite frontend application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Create execution container
FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
# Install only production dependencies (express, sqlite3, cors, multer, kafkajs)
RUN npm install --only=production

# Copy built frontend assets
COPY --from=builder /app/dist ./dist
# Copy backend code, static data configs, and assets
COPY --from=builder /app/server.js ./
COPY --from=builder /app/js/data.js ./js/
COPY --from=builder /app/authentication.txt ./
COPY --from=builder /app/vite.config.js ./

EXPOSE 5001

ENV NODE_ENV=production
ENV PORT=5001

CMD ["node", "server.js"]
