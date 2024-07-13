from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from create_tables import Versichertendaten, Versicherungsvertraege, Schadensfaelle
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database connection
DATABASE_URL = os.environ.get('DATABASE_URL', "postgresql://postgres:123456@localhost:5433/spectrumK")
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

# Define the Protokolltabelle table
class Protokolltabelle(Base):
    __tablename__ = 'Protokolltabelle'
    id = Column(Integer, primary_key=True)
    label = Column(String, nullable=False)
    start_row = Column(Integer, nullable=False)
    end_row = Column(Integer, nullable=False)
    download_time = Column(DateTime, default=datetime.now())

# Create tables if they do not exist
Base.metadata.create_all(engine)

@app.route('/', methods=['GET'])
def get_versichertendaten():
    versicherte = session.query(Versichertendaten).all()
    result = [
        {
            'Versichertennummer': versichert.Versichertennummer,
            'Name': versichert.Name,
            'Geburtsdatum': versichert.Geburtsdatum.strftime('%Y-%m-%d'),
            'Adresse': versichert.Adresse
        } for versichert in versicherte
    ]
    return jsonify(result)

@app.route('/versicherungsvertraege', methods=['GET'])
def get_versicherungsvertraege():
    vertraege = session.query(Versicherungsvertraege).all()
    result = [
        {
            'Vertragsnummer': vertrag.Vertragsnummer,
            'Versichertennummer': vertrag.Versichertennummer,
            'Vertragsbeginn': vertrag.Vertragsbeginn.strftime('%Y-%m-%d'),
            'Vertragsende': vertrag.Vertragsende.strftime('%Y-%m-%d'),
            'Vertragsstatus': vertrag.Vertragsstatus
        } for vertrag in vertraege
    ]
    return jsonify(result)

@app.route('/schadensfaelle', methods=['GET'])
def get_schadensfaelle():
    schadensfaelle = session.query(Schadensfaelle).all()
    result = [
        {
            'Schadensnummer': schaden.Schadensnummer,
            'Vertragsnummer': schaden.Vertragsnummer,
            'Datum': schaden.Datum.strftime('%Y-%m-%d'),
            'Schadenstyp': schaden.Schadenstyp,
            'Schadenhoehe': str(schaden.Schadenhoehe)
        } for schaden in schadensfaelle
    ]
    return jsonify(result)

@app.route('/Protokolltabelle', methods=['POST'])
def log_download():
    data = request.json
    label = data.get('label')
    start_row = data.get('start_row')
    end_row = data.get('end_row')

    new_log = Protokolltabelle(label=label, start_row=start_row, end_row=end_row)
    session.add(new_log)
    session.commit()

    return jsonify({"message": "Download logged successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
