FROM php:8.2-apache

# Instalar dependências do PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev

# Instalar extensão PDO para PostgreSQL
RUN docker-php-ext-install pdo pdo_pgsql

# Habilitar mod_rewrite do Apache (opcional)
RUN a2enmod rewrite

# Copiar código da aplicação para o Apache
COPY ./app /var/www/html

# Material tirado na net
