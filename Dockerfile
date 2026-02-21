# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.19.0
FROM node:${NODE_VERSION}-alpine AS base

# Install build dependencies for npm
USER root
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /usr/app

# Fix ownership for node user (must be root!)
RUN chown -R node:node /usr/app

# Switch to non-root user
USER node

# ================================
# Dependencies Stage
# ================================
FROM base AS deps

# Copy package files
COPY package*.json ./

# Install production dependencies as node user
RUN npm ci --omit=dev

# ================================
# Build Dependencies Stage
# ================================
FROM base AS build-deps

# Copy package files
COPY package*.json ./

# Install all dependencies for build as node user
RUN npm ci

# ================================
# Build Stage
# ================================
FROM build-deps AS build

# Copy source code
COPY --chown=node:node . .

# Build the application
RUN npm run build

# ================================
# Production Stage
# ================================
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/app

ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=256 --no-warnings" \
    NPM_CONFIG_LOGLEVEL=silent

# Copy production dependencies and build output
COPY --from=deps /usr/app/node_modules ./node_modules
COPY --from=deps /usr/app/package*.json ./
COPY --from=build /usr/app/build ./build

# Fix ownership (must be root!)
USER root
RUN chown -R node:node /usr/app

# Switch to non-root user
USER node

# Expose port
EXPOSE 8080

CMD ["node", "build/src/main.js"]