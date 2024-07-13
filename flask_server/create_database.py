import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Database connection parameters
DB_NAME = "spectrumK"
DB_USER = "postgres"
DB_PASSWORD = "123456"
DB_HOST = "localhost"
DB_PORT = "5433"

def create_database():
    try:
        # Connect to the PostgreSQL server
        conn = psycopg2.connect(
            dbname="postgres",
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

        # Create a cursor object
        cursor = conn.cursor()

        # Create the database
        cursor.execute(f"CREATE DATABASE {DB_NAME}")

        # Close communication with the PostgreSQL database server
        cursor.close()
        conn.close()

        print(f"Database '{DB_NAME}' created successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    create_database()