# syntax=docker/dockerfile:1

FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Render forwards service env vars as `docker build` build-args. Without matching `ARG`
# lines they never reach this stage, so Vite sees no VITE_* values (.env is dockerignored).
ARG VITE_WEB3FORMS_ACCESS_KEY
ARG WEB3FORMS_ACCESS_KEY
ARG VITE_SITE_URL
ARG URL
ARG DEPLOY_PRIME_URL
ARG RENDER
ARG NETLIFY
ARG VITE_NETLIFY_FORMS

RUN npm run build

FROM nginx:1.27-alpine AS production

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
