FROM php:8.3-cli

WORKDIR /app

COPY data/ data/
COPY src/ src/
COPY config/ config/
COPY public/ public/



RUN chmod -R 777 data/

EXPOSE 80

CMD ["php", "-S", "0.0.0.0:80", "-t", "public", "public/index.php"]