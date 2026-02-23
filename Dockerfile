FROM node:20-alpine AS build
WORKDIR /app

COPY package.json .babelrc ./
RUN npm install

COPY script.js ./script.js
RUN npx babel script.js --out-file /app/dist/script.js

FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY static /usr/share/nginx/html/static
COPY --from=build /app/dist/script.js /usr/share/nginx/html/script.js

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
