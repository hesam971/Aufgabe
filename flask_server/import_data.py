import faker
from datetime import timedelta
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from create_tables import Versichertendaten, Versicherungsvertraege, Schadensfaelle

fake = faker.Faker()

# Database
DATABASE_URL = "postgresql://NAME:PASSWORD@localhost:5433/YOUR_DATABASE_NAME"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Generate fake data
def generate_versichertendaten(num_records):
    versichertendaten = []
    for i in range(num_records):
        name = fake.name()
        geburtsdatum = fake.date_of_birth(minimum_age=18, maximum_age=90)
        adresse = fake.address()
        versichertendaten.append(Versichertendaten(Name=name, Geburtsdatum=geburtsdatum, Adresse=adresse))
    return versichertendaten

def generate_versicherungsvertraege(num_records, versichertendaten):
    versicherungsvertraege = []
    for i in range(num_records):
        versichertennummer = i % len(versichertendaten) + 1
        vertragsbeginn = fake.date_between(start_date='-5y', end_date='today')
        vertragsende = vertragsbeginn + timedelta(days=fake.random_int(min=30, max=365, step=1))
        vertragsstatus = fake.random_element(elements=('aktiv', 'gekuendigt', 'abgelaufen'))
        versicherungsvertraege.append(Versicherungsvertraege(Versichertennummer=versichertennummer, Vertragsbeginn=vertragsbeginn, Vertragsende=vertragsende, Vertragsstatus=vertragsstatus))
    return versicherungsvertraege

def generate_schadensfaelle(num_records, versicherungsvertraege):
    schadensfaelle = []
    for i in range(num_records):
        vertragsnummer = i % len(versicherungsvertraege) + 1
        datum = fake.date_between(start_date='-5y', end_date='today')
        schadenstyp = fake.random_element(elements=('Unfall', 'Diebstahl', 'Feuer'))
        schadenhoehe = fake.random_int(min=100, max=10000, step=1)
        schadensfaelle.append(Schadensfaelle(Vertragsnummer=vertragsnummer, Datum=datum, Schadenstyp=schadenstyp, Schadenhoehe=schadenhoehe))
    return schadensfaelle

# Read generated data, and import them
num_records = 50
versichertendaten_data = generate_versichertendaten(num_records)
versicherungsvertraege_data = generate_versicherungsvertraege(num_records, versichertendaten_data)
schadensfaelle_data = generate_schadensfaelle(num_records, versicherungsvertraege_data)

for data in versichertendaten_data:
    session.add(data)

for data in versicherungsvertraege_data:
    session.add(data)

for data in schadensfaelle_data:
    session.add(data)

session.commit()

print("Daten wurden erfolgreich in die Datenbank eingefügt.")
