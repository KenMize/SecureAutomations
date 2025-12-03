FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.14.0

# Copy package files
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build with Railway API URL
ARG VITE_API_BASE_URL=https://secureautomations-production.up.railway.app/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build client and server
RUN pnpm run build:client && pnpm run build:server

# Start the server
CMD ["npm", "start"]
