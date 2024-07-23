from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base

# Database
DATABASE_URL = "postgresql://postgres:123456@localhost:5433/YOUR_DATABASE_NAME"
engine = create_engine(DATABASE_URL)
Base = declarative_base()

# Define tables
class Versichertendaten(Base):
    __tablename__ = 'versichertendaten'
    Versichertennummer = Column(Integer, primary_key=True)
    Name = Column(String)
    Geburtsdatum = Column(Date)
    Adresse = Column(String)

class Versicherungsvertraege(Base):
    __tablename__ = 'versicherungsvertraege'
    Vertragsnummer = Column(Integer, primary_key=True)
    Versichertennummer = Column(Integer)
    Vertragsbeginn = Column(Date)
    Vertragsende = Column(Date)
    Vertragsstatus = Column(String)

class Schadensfaelle(Base):
    __tablename__ = 'schadensfaelle'
    Schadensnummer = Column(Integer, primary_key=True)
    Vertragsnummer = Column(Integer)
    Datum = Column(Date)
    Schadenstyp = Column(String)
    Schadenhoehe = Column(Integer)

# Create tables
Base.metadata.create_all(engine)

print("Tabellen wurden erfolgreich erstellt.")
