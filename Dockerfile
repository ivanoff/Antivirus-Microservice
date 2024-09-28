FROM oven/bun:latest

RUN apt update && apt install -y clamav clamav-daemon && freshclam

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY src ./src
COPY clamav/clamd.conf /etc/clamav/clamd.conf

RUN bun install

CMD service clamav-daemon start && bun src/server.ts
