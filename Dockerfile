FROM nginx:1.27-alpine

# Rensa default statiska filer
RUN rm -rf /usr/share/nginx/html/*

# Kopiera webbsidan
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js
COPY static /usr/share/nginx/html/static

EXPOSE 80

# Enkel healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
