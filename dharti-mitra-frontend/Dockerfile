# dharti-mitra-frontend/Dockerfile

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Accept API URLs as build args (injected by CI/CD from GitHub Secrets)
ARG REACT_APP_BASE_URL=http://localhost:8080
ARG REACT_APP_SOIL_ANALYSIS_URL=http://localhost:8081
ARG REACT_APP_FERTILIZER_URL=http://localhost:8082
ARG REACT_APP_HEALTH_CARD_URL=http://localhost:8082
ARG REACT_APP_CHATBOT_URL=http://localhost:8082

# Make them available as env vars for the React build
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_SOIL_ANALYSIS_URL=$REACT_APP_SOIL_ANALYSIS_URL
ENV REACT_APP_FERTILIZER_URL=$REACT_APP_FERTILIZER_URL
ENV REACT_APP_HEALTH_CARD_URL=$REACT_APP_HEALTH_CARD_URL
ENV REACT_APP_CHATBOT_URL=$REACT_APP_CHATBOT_URL

COPY package.json package-lock.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

# ── Stage 2: Serve via Nginx ──────────────────────────────────────────────────
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]