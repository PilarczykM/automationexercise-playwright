FROM node:22-bullseye-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gnupg \
    ca-certificates \
    build-essential \
    make \
    git \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY package*.json ./
RUN npm ci

RUN npx playwright install chromium --with-deps

COPY . .

# Playwright port
EXPOSE 9323
