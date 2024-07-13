#!/bin/bash
set -e

# Wait for the database to be ready
while !</dev/tcp/db/5432; do
  echo "Waiting for the database..."
  sleep 1
done

# Run the create_database.py script
python create_database.py

# Run the create_tables.py script
python create_tables.py

# Run the import_data.py script
python import_data.py

# Run the Flask application
exec python main.py
