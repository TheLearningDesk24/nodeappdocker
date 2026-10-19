# SINGLE STAGE DOCKERFILE
FROM node:22-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application code
COPY src/ ./src/

ENV NODE_ENV=production
ENV PORT=3000

USER node
EXPOSE 3000

CMD ["node", "src/server.js"]