#!/bin/bash

set -e

# Wait for MySQL to be ready (optional but recommended)
until nc -z -v -w30 mysql 3306
do
  echo "Waiting for MySQL connection..."
  sleep 5
done

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Start Apache in the foreground
echo "Starting Apache..."
exec apache2-foreground
