# DOKUMEN KONSEP — TIDAK di-build (environment kelas tanpa Docker).
# Detail Docker/Podman sungguhan dibahas di sesi-day3.md.
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
CMD ["node", "-e", "console.log(require('./src/stringUtils').capitalize('halo dunia'))"]
