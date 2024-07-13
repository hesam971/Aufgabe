import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Database
DB_NAME = "spectrumK"
DB_USER = "postgres"
DB_PASSWORD = "123456"
DB_HOST = "localhost"
DB_PORT = "5433"

def create_database():
    try:
        # Connect to server
        conn = psycopg2.connect(
            dbname="postgres",
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

        cursor = conn.cursor()

        cursor.execute(f"CREATE DATABASE {DB_NAME}")

        cursor.close()
        conn.close()

        print(f"Datenbank '{DB_NAME}' erfolgreich erstellt.")
    except Exception as e:
        print(f"Ein Fehler ist aufgetreten: {e}")

if __name__ == "__main__":
    create_database()