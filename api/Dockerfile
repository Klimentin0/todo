FROM php:8.3.11-apache

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    git \
    unzip \
    mariadb-client \
    netcat-openbsd \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Рабочая директория контейнера
WORKDIR /var/www/html

# Копирование проекта
COPY . .
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
# Настройка прав доступа
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html
# Включение модуля mod_rewrite
# Открытие порта
EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]
