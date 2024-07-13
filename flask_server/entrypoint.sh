#!/bin/bash
set -e

# Wait for the database to be ready
while !</dev/tcp/db/5432; do
  echo "Waiting for the database..."
  sleep 1
done

python create_database.py

python create_tables.py

python import_data.py

exec python main.py
