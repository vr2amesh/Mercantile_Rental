#######################################################################################
### This is the RESTful API I will use for the Mercantile application.
### It includes Seven databases, The CLIENT TRIPS, the COMPANIES, the DRIVERS, the
### VEHICLES, DRIVER TRIPS, INDIVIDUAL TRIPS, and SELF TRIPS. 
#######################################################################################


from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime
import os
import sys
import logging 

app = Flask(__name__)

# Helps with the location of the directory
basedir = os.path.abspath(os.path.dirname(__file__))

# Which database will we fetch from?
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
#######################################################################################

# Bind the SQLAlchemy and Marshmallow
class Trip(db.Model):
    trip_id = db.Column(db.Integer, primary_key = True)
    comp_id = db.Column(db.Integer, unique = False)
    vehicle_id = db.Column(db.Unicode, unique = False)
    driver_id = db.Column(db.Integer, unique = False)
    start_date = db.Column(db.Unicode, unique = False)
    departure = db.Column(db.Unicode, unique = False)
    start_mileage = db.Column(db.Integer, unique = False)
    end_date = db.Column(db.Unicode, unique = False)
    destination = db.Column(db.Unicode, unique = False)
    end_mileage = db.Column(db.Integer, unique = False)
    client = db.Column(db.Unicode, unique = False)
    status = db.Column(db.Unicode, unique = False)
    trip_type = db.Column(db.Unicode, unique = False)
    signature = db.Column(db.Unicode, unique = False)
    departure_geo_lat = db.Column(db.Unicode, unique = False)
    departure_geo_long = db.Column(db.Unicode, unique = False)
    destination_geo_lat = db.Column(db.Unicode, unique = False)
    destination_geo_long = db.Column(db.Unicode, unique = False)

    def __init__(self, trip_type, comp_id, vehicle_id, driver_id, start_date,\
        departure, start_mileage, client, departure_geo_lat, departure_geo_long, status = 'In Progress'):
        self.comp_id = comp_id
        self.vehicle_id = vehicle_id
        self.driver_id = driver_id
        self.start_date = start_date
        self.departure = departure
        self.start_mileage = start_mileage
        self.client = client
        self.status = status
        self.trip_type = trip_type
        self.departure_geo_lat = departure_geo_lat
        self.departure_geo_long = departure_geo_long

class TripSchema(ma.Schema):
    class Meta:
        fields = ('trip_id','comp_id','vehicle_id','driver_id','start_date',\
            'departure','start_mileage','end_date','destination',\
            'end_mileage','client', 'status','trip_type','signature',\
             'departure_geo_lat', 'departure_geo_long', 'destination_geo_lat', 'destination_geo_long')

trip_schema = TripSchema()
trips_schema = TripSchema(many = True)

#######################################################################################

class SelfDriverTrip(db.Model):
    trip_id = db.Column(db.Integer, primary_key = True)
    vehicle_id = db.Column(db.Unicode, unique = False)
    start_date = db.Column(db.Unicode, unique = False)
    start_mileage = db.Column(db.Integer, unique = False)
    client = db.Column(db.Unicode, unique = False)
    end_mileage = db.Column(db.Integer, unique = False)
    end_date = db.Column(db.Unicode, unique = False)
    email = db.Column(db.Unicode, unique = False)
    license_number = db.Column(db.Unicode, unique = False)
    phone = db.Column(db.Integer, unique = False)
    address = db.Column(db.Unicode, unique = False)
    purpose = db.Column(db.Unicode, unique = False)
    signature = db.Column(db.Unicode, unique = False)
    status = db.Column(db.Unicode, unique = False)


    def __init__(self, vehicle_id, start_date, start_mileage, client,\
            email, license_number, phone, address, purpose, status="In Progress"):
        self.vehicle_id = vehicle_id
        self.start_date = start_date
        self.start_mileage = start_mileage
        self.client = client
        self.email = email
        self.license_number = license_number
        self.phone = phone
        self.address = address
        self.purpose = purpose
        self.status = status

class SelfSchema(ma.Schema):
    class Meta:
        fields = ('trip_id','vehicle_id','start_date','start_mileage', 'client',\
            'end_mileage','end_date','email','license_number','phone','address',\
            'purpose','signature','status') 
self_schema = SelfSchema()
selfs_schema = SelfSchema(many = True)   

#######################################################################################

class DriverTrip(db.Model):
    trip_id = db.Column(db.Integer, primary_key = True)
    vehicle_id = db.Column(db.Unicode, unique = False)
    driver_id = db.Column(db.Integer, unique = False)
    start_date = db.Column(db.Unicode, unique = False)
    departure = db.Column(db.Unicode, unique = False)
    start_mileage = db.Column(db.Integer, unique = False)
    end_date = db.Column(db.Unicode, unique = False)
    destination = db.Column(db.Unicode, unique = False)
    end_mileage = db.Column(db.Integer, unique = False)
    status = db.Column(db.Unicode, unique = False)
    departure_geo_lat = db.Column(db.Unicode, unique = False)
    departure_geo_long = db.Column(db.Unicode, unique = False)
    destination_geo_lat = db.Column(db.Unicode, unique = False)
    destination_geo_long = db.Column(db.Unicode, unique = False)

    def __init__(self, vehicle_id, driver_id, start_date, departure,\
        start_mileage, departure_geo_lat, departure_geo_long, status = 'In Progress'):
        self.vehicle_id = vehicle_id
        self.driver_id = driver_id
        self.start_date = start_date
        self.departure = departure
        self.start_mileage = start_mileage
        self.status = status
        self.departure_geo_lat = departure_geo_lat
        self.departure_geo_long = departure_geo_long

class DriverTripSchema(ma.Schema):
    class Meta:
        fields = ('trip_id','vehicle_id','driver_id', 'start_date',\
            'departure','start_mileage', 'end_date', 'destination', 'end_mileage',\
            'status', 'departure_geo_lat', 'departure_geo_long', 'destination_geo_lat', 'destination_geo_long')

driver_trip_schema = DriverTripSchema()
driver_trip_schemas = DriverTripSchema(many = True)

#######################################################################################

class IndividualTrip(db.Model):
    trip_id = db.Column(db.Integer, primary_key = True)
    vehicle_id = db.Column(db.Unicode, unique = False)
    driver_id = db.Column(db.Integer, unique = False)
    start_date = db.Column(db.Unicode, unique = False)
    departure = db.Column(db.Unicode, unique = False)
    start_mileage = db.Column(db.Integer, unique = False)
    end_date = db.Column(db.Unicode, unique = False)
    destination = db.Column(db.Unicode, unique = False)
    end_mileage = db.Column(db.Integer, unique = False)
    client = db.Column(db.Unicode, unique = False)
    status = db.Column(db.Unicode, unique = False)
    trip_type = db.Column(db.Unicode, unique = False)
    signature = db.Column(db.Unicode, unique = False)
    departure_geo_lat = db.Column(db.Unicode, unique = False)
    departure_geo_long = db.Column(db.Unicode, unique = False)
    destination_geo_lat = db.Column(db.Unicode, unique = False)
    destination_geo_long = db.Column(db.Unicode, unique = False)


    def __init__(self, trip_type, vehicle_id, driver_id, start_date, departure,\
        start_mileage, client, departure_geo_lat, departure_geo_long, status = 'In Progress'):
        self.vehicle_id = vehicle_id
        self.driver_id = driver_id
        self.start_date = start_date
        self.departure = departure
        self.start_mileage = start_mileage
        self.client = client
        self.status = status
        self.trip_type = trip_type
        self.departure_geo_lat = departure_geo_lat
        self.departure_geo_long = departure_geo_long

class IndividualTripSchema(ma.Schema):
    class Meta:
        fields = ('trip_id', 'vehicle_id', 'driver_id', 'start_date', 'departure',\
            'start_mileage', 'end_date', 'destination', 'end_mileage',\
            'client', 'status', 'trip_type','signature', 'departure_geo_lat',\
             'departure_geo_long', 'destination_geo_lat', 'destination_geo_long')

individual_trip_schema = IndividualTripSchema()
individual_trip_schemas = IndividualTripSchema(many = True)

#######################################################################################

class Company(db.Model):
    comp_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Unicode, unique = True)

    def __init__(self, name):
        self.name = name

class CompanySchema(ma.Schema):
    class Meta:
        fields = ('comp_id', 'name')

comp_schema = CompanySchema()
comps_schema = CompanySchema(many = True)

#######################################################################################

class Driver(db.Model):
    driver_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Unicode, unique = True)
    password = db.Column(db.Unicode)
    company_id = db.Column(db.Unicode, unique = True)
    license_number = db.Column(db.Unicode, unique = True)
    email = db.Column(db.Unicode, unique = True)
    status = db.Column(db.Unicode)
    phone = db.Column(db.Integer)
    current_trip = db.Column(db.Integer)
    current_trip_type = db.Column(db.Unicode)

    def __init__(self, name, password, company_id, license_number, email, phone, status="Available"):
        self.name = name
        self.password = password
        self.company_id = company_id
        self.license_number = license_number
        self.email = email
        self.status = status
        self.phone = phone

class DriverSchema(ma.Schema):
    class Meta:
        fields = ('driver_id', 'name', 'password', 'company_id','license_number','email',\
            'status','phone','current_trip','current_trip_type')

driver_schema = DriverSchema()
drivers_schema = DriverSchema(many = True)

#######################################################################################

class Vehicle(db.Model):
    vehicle_id = db.Column(db.Unicode, primary_key = True)
    make = db.Column(db.Unicode)
    current_mileage = db.Column(db.Integer)
    status = db.Column(db.Unicode)

    def __init__(self, vehicle_id, make, current_mileage, status = "Available"):
        self.vehicle_id = vehicle_id
        self.make = make
        self.current_mileage = current_mileage
        self.status = status

class VehicleSchema(ma.Schema):
    class Meta:
        fields = ('vehicle_id', 'make', 'current_mileage', 'status')

vehicle_schema = VehicleSchema()
vehicles_schema = VehicleSchema(many = True)

#######################################################################################
########### TRIPS ################# TRIPS #################### TRIPS ##################

# Endpoint to create new trips
@app.route("/trip", methods = ["POST"])
def add_trip():
    # Start info
    comp_id = request.json['comp_id']
    vehicle_id = request.json['vehicle_id']
    driver_id = request.json['driver_id']
    start_date = request.json['start_date']
    departure = request.json['departure']
    start_mileage = request.json['start_mileage']
    client = request.json['client']
    trip_type = request.json['trip_type']
    departure_geo_lat = request.json['departure_geo_lat']
    departure_geo_long = request.json['departure_geo_long']


    new_trip = Trip(trip_type, comp_id, vehicle_id, driver_id, \
        start_date, departure, start_mileage, client, departure_geo_lat, departure_geo_long)

    db.session.add(new_trip)
    db.session.commit()

    return trip_schema.jsonify(new_trip)

#######################################################################################    

# Endpoint to show all client trips
@app.route("/trip", methods = ["GET"])
def get_trips():
    all_trips = Trip.query.all()
    result = trips_schema.dump(all_trips)
    return jsonify(result.data)

#######################################################################################

# Endpoint to get trip detail by id
@app.route("/trip/<trip_id>", methods = ["GET"])
def trip_detail(trip_id):
    trip = Trip.query.get(trip_id)
    return trip_schema.jsonify(trip)

#######################################################################################

# Endpoint to update trip
@app.route("/trip/<trip_id>", methods = ["PUT"])
def trip_update(trip_id):
    try:
        trip = Trip.query.get(trip_id)
        comp_id = request.json['comp_id']
        vehicle_id = request.json['vehicle_id']
        driver_id = request.json['driver_id']
        start_date = request.json['start_date']
        departure = request.json['departure']
        start_mileage = request.json['start_mileage']
        client = request.json['client']
        end_date = request.json['end_date']
        destination = request.json['destination']
        end_mileage = request.json['end_mileage']
        status = request.json['status']
        trip_type = request.json['trip_type']
        destination_geo_lat = request.json['destination_geo_lat']
        destination_geo_long = request.json['destination_geo_long']

        trip.comp_id = comp_id
        trip.vehicle_id = vehicle_id
        trip.driver_id = driver_id
        trip.start_date = start_date
        trip.departure = departure
        trip.start_mileage = start_mileage
        trip.client = client
        trip.end_date = end_date
        trip.destination = destination
        trip.end_mileage = end_mileage
        trip.status = status
        trip.trip_type = trip_type
        trip.destination_geo_lat = destination_geo_lat
        trip.destination_geo_long = destination_geo_long
    except Exception as e:
        return {
            'error':'An error occurred, %s' % e
        }

    db.session.commit()
    return trip_schema.jsonify(trip)

#######################################################################################

# Endpoint to update trip signature
@app.route("/trip/signature/<trip_id>", methods=["PUT"])
def trip_signature(trip_id):
    trip = Trip.query.get(trip_id)

    signature = request.json['signature']

    trip.signature = signature

    db.session.commit()
    return trip_schema.jsonify(trip)

#######################################################################################

# Endpoint to delete trip
@app.route("/trip/<trip_id>", methods = ["DELETE"])
def trip_delete(trip_id):
    trip = Trip.query.get(trip_id)

    
    db.session.delete(trip)
    db.session.commit()
    
    return trip_schema.jsonify(trip)

#######################################################################################
############ SELF___TRIP ############ SELF___TRIP ############ SELF___TRIP ############

#Endpoint to create a new self trip
@app.route("/self", methods = ["POST"])
def self_new():
    vehicle_id = request.json['vehicle_id']
    start_date = request.json['start_date']
    start_mileage = request.json['start_mileage']
    client = request.json['client']
    email = request.json['email']
    license_number = request.json['license_number']
    phone = request.json['phone']
    address = request.json['address']
    purpose = request.json['purpose']

    new_trip = SelfDriverTrip(vehicle_id, start_date, start_mileage,\
        client, email, license_number, phone, address, purpose)
    db.session.add(new_trip)
    db.session.commit()

    return self_schema.jsonify(new_trip)

#######################################################################################

# ENd point for all self trips
@app.route("/self", methods=["GET"])
def self_get_trips():
    all_trips = SelfDriverTrip.query.all()
    result = selfs_schema.dump(all_trips)
    return jsonify(result.data)

#######################################################################################

# Endpoint for a particular self trip
@app.route("/self/<trip_id>", methods=["GET"])
def self_trip_detail(trip_id):
    trip = SelfDriverTrip.query.get(trip_id)
    return self_schema.jsonify(trip)

#######################################################################################

@app.route("/self/<trip_id>", methods=["PUT"])
def self_update(trip_id):
    trip = SelfDriverTrip.query.get(trip_id)
    vehicle_id = request.json['vehicle_id']
    start_date = request.json['start_date']
    start_mileage = request.json['start_mileage']
    client = request.json['client']
    end_mileage = request.json['end_mileage']
    end_date = request.json['end_date']
    email = request.json['email']
    license_number = request.json['license_number']
    phone = request.json['phone']
    address = request.json['address']
    purpose = request.json['purpose']
    status = request.json['status']

    trip.vehicle_id = vehicle_id
    trip.start_date = start_date
    trip.start_mileage = start_mileage
    trip.client = client
    trip.end_mileage = end_mileage
    trip.end_date = end_date
    if (trip.email == ''):
        trip.email = email
    trip.license_number = license_number
    trip.phone = phone
    if (trip.address == ''):
        trip.address = address
    trip.purpose = purpose
    trip.status = status

    db.session.commit()
    return self_schema.jsonify(trip)

#######################################################################################

# Endpoint to update trip signature
@app.route("/self/signature/<trip_id>", methods=["PUT"])
def trip_sign(trip_id):
    trip = SelfDriverTrip.query.get(trip_id)

    signature = request.json['signature']

    trip.signature = signature

    db.session.commit()
    return self_schema.jsonify(trip)

#######################################################################################

# Endpoint to validate a self user by phone number
@app.route("/self/validate", methods = ["POST"])
def self_isValid():
    phone = request.json['phone']
    license_number = request.json['license_number']
    vehicle_id = request.json['vehicle_id']

    trip = SelfDriverTrip.query.filter_by(phone=phone,\
        license_number=license_number,vehicle_id=vehicle_id).first()

    if trip is None:
        return jsonify({"message": "SELF_NOT_EXIST"}), 400
    elif (trip.status != "In Progress"):
        return jsonify({"message": "SELF_COMPLETED"}), 400
    else:
        return self_schema.jsonify(trip), 200


#######################################################################################

# Endpoint to delete trip
@app.route("/self/<trip_id>", methods = ["DELETE"])
def self_trip_delete(trip_id):
    trip = SelfDriverTrip.query.get(trip_id)

    db.session.delete(trip)
    db.session.commit()
    
    return self_schema.jsonify(trip)

#######################################################################################
############ DRIVER_TRIP ############ DRIVER_TRIP ############ DRIVER_TRIP ############

# Endpoint to create a driver trip
@app.route("/driver-trip", methods = ['POST'])
def trip_new():
    vehicle_id = request.json['vehicle_id']
    driver_id = request.json['driver_id']
    departure = request.json['departure']
    start_date = request.json['start_date']
    start_mileage = request.json['start_mileage']
    departure_geo_lat = request.json['departure_geo_lat']
    departure_geo_long = request.json['departure_geo_long']

    new_trip = DriverTrip(vehicle_id, driver_id, start_date,\
        departure, start_mileage, departure_geo_lat, departure_geo_long)

    db.session.add(new_trip)
    db.session.commit()

    return driver_trip_schema.jsonify(new_trip)

#######################################################################################

# Endpoint to show all client trips
@app.route("/driver-trip", methods = ["GET"])
def get_driver_trips():
    all_trips = DriverTrip.query.all()
    result = driver_trip_schemas.dump(all_trips)
    return jsonify(result.data)

#######################################################################################

# Endpoint to show a particular client trip
@app.route("/driver-trip/<trip_id>", methods = ["GET"])
def driver_trip_detail(trip_id):
    trip = DriverTrip.query.get(trip_id)
    return driver_trip_schema.jsonify(trip)

#######################################################################################

@app.route('/driver-trip/<trip_id>', methods = ['PUT'])
def driver_trip_update(trip_id):
    trip = DriverTrip.query.get(trip_id)
    vehicle_id = request.json['vehicle_id']
    driver_id = request.json['driver_id']
    start_date = request.json['start_date']
    departure = request.json['departure']
    start_mileage = request.json['start_mileage']
    end_date = request.json['end_date']
    destination = request.json['destination']
    end_mileage = request.json['end_mileage']
    status = request.json['status']
    destination_geo_lat = request.json['destination_geo_lat']
    destination_geo_long = request.json['destination_geo_long']

    trip.vehicle_id = vehicle_id
    trip.driver_id = driver_id
    trip.start_date = start_date
    trip.departure = departure
    trip.start_mileage = start_mileage
    trip.end_date = end_date
    trip.destination = destination
    trip.end_mileage = end_mileage
    trip.status = status
    trip.destination_geo_lat = destination_geo_lat
    trip.destination_geo_long = destination_geo_long

    db.session.commit()
    return driver_trip_schema.jsonify(trip)

#######################################################################################

# Endpoint to delete trip
@app.route("/driver-trip/<trip_id>", methods = ["DELETE"])
def driver_trip_delete(trip_id):
    trip = DriverTrip.query.get(trip_id)

    db.session.delete(trip)
    db.session.commit()
    
    return driver_trip_schema.jsonify(trip)

#######################################################################################
############ INDIVI_TRIP ############ INDIVI_TRIP ############ INDIVI_TRIP ############

# Endpoint to create a new individual trip
@app.route("/indi-trip", methods = ['POST'])
def indi_trip_new():
    vehicle_id = request.json['vehicle_id']
    driver_id = request.json['driver_id']
    start_date = request.json['start_date']
    departure = request.json['departure']
    start_mileage = request.json['start_mileage']
    client = request.json['client']
    trip_type = request.json['trip_type']
    departure_geo_lat = request.json['departure_geo_lat']
    departure_geo_long = request.json['departure_geo_long']

    new_trip = IndividualTrip(trip_type, vehicle_id, driver_id, start_date,\
        departure, start_mileage, client, departure_geo_lat, departure_geo_long)

    db.session.add(new_trip)
    db.session.commit()

    return individual_trip_schema.jsonify(new_trip)

#######################################################################################

# End point to show all trips
@app.route("/indi-trip", methods = ['GET'])
def indi_trip_get():
    all_trips = IndividualTrip.query.all()
    result = individual_trip_schemas.dump(all_trips)
    return jsonify(result.data)

#######################################################################################

# End point to show a particular trip
@app.route("/indi-trip/<trip_id>", methods = ['GET'])
def indi_trip_detail(trip_id):
    trip = IndividualTrip.query.get(trip_id)
    return individual_trip_schema.jsonify(trip)

#######################################################################################

@app.route('/indi-trip/<trip_id>', methods = ['PUT'])
def indi_trip_update(trip_id):
    trip = IndividualTrip.query.get(trip_id)
    vehicle_id = request.json['vehicle_id']
    driver_id = request.json['driver_id']
    start_date = request.json['start_date']
    departure = request.json['departure']
    start_mileage = request.json['start_mileage']
    end_date = request.json['end_date']
    destination = request.json['destination']
    end_mileage = request.json['end_mileage']
    client = request.json['client']
    status = request.json['status']
    destination_geo_lat = request.json['destination_geo_lat']
    destination_geo_long = request.json['destination_geo_long']

    trip.vehicle_id = vehicle_id
    trip.driver_id = driver_id
    trip.start_date = start_date
    trip.departure = departure
    trip.start_mileage = start_mileage
    trip.end_date = end_date
    trip.destination = destination
    trip.end_mileage = end_mileage
    trip.client = client
    trip.status = status
    trip.destination_geo_lat = destination_geo_lat
    trip.destination_geo_long = destination_geo_long

    db.session.commit()
    return individual_trip_schema.jsonify(trip)

#######################################################################################

# Endpoint to update trip signature
@app.route("/indi-trip/signature/<trip_id>", methods=["PUT"])
def indi_trip_signature(trip_id):
    trip = IndividualTrip.query.get(trip_id)

    signature = request.json['signature']

    trip.signature = signature

    db.session.commit()
    return individual_trip_schema.jsonify(trip)

#######################################################################################

@app.route('/indi-trip/<trip_id>', methods = ['DELETE'])
def indi_trip_delete(trip_id):
    trip = IndividualTrip.query.get(trip_id)

    db.session.delete(trip)
    db.session.commit()
    
    return individual_trip_schema.jsonify(trip)

#######################################################################################
############ COMPANY ################# COMPANY ################ COMPANY ###############

# Endpoint to create new companies
@app.route("/company", methods = ["POST"])
def company_add():
    # Start info
    name = request.json['name']

    new_company = Company(name)

    db.session.add(new_company)
    db.session.commit()

    return comp_schema.jsonify(new_company)

#######################################################################################

# Endpoint to validate a company name
@app.route("/company/validate", methods=['POST'])
def company_isValid():
    company = request.json['company']

    comp = Company.query.filter_by(name=company).first()

    if comp is None:
        return jsonify({"message": "Invalid Company Name"}), 400
    else:
        return jsonify({
                "message": "Success",
                "comp_id": comp.comp_id
            }), 200

#######################################################################################

# Endpoint to show all companies
@app.route("/company", methods = ["GET"])
def get_companies():
    all_companies = Company.query.all()
    result = comps_schema.dump(all_companies)
    return jsonify(result.data)

#######################################################################################

# Endpoint to get company detail by id
@app.route("/company/<comp_id>", methods = ["GET"])
def comp_detail(comp_id):
    comp = Company.query.get(comp_id)
    return comp_schema.jsonify(comp)

#######################################################################################

# Endpoint to delete company
@app.route("/company/<comp_id>", methods = ["DELETE"])
def comp_delete(comp_id):
    comp = Company.query.get(comp_id)

    
    db.session.delete(comp)
    db.session.commit()
    
    return comp_schema.jsonify(comp)

#######################################################################################
############# DRIVER ################# DRIVER ################# DRIVER ################

# Endpoint to create new drivers
@app.route("/driver", methods = ["POST"])
def driver_add():
    # Start info
    name = request.json['name']
    password = request.json['password']
    company_id = request.json['company_id']
    license_number = request.json['license_number']
    email = request.json['email']
    phone = request.json['phone']

    new_driver = Driver(name, password, company_id, license_number, email, phone)

    db.session.add(new_driver)
    db.session.commit()

    return driver_schema.jsonify(new_driver)

#######################################################################################

# Endpoint to change the status of the driver
@app.route("/driver/<driver_id>", methods = ["PUT"])
def driver_update(driver_id):
    driver = Driver.query.get(driver_id)
    status = request.json['status']
    current_trip = request.json['current_trip']
    current_trip_type = request.json['current_trip_type']

    driver.status = status
    driver.current_trip = current_trip
    driver.current_trip_type = current_trip_type
    db.session.commit()

    return driver_schema.jsonify(driver)

#######################################################################################

# Endpoint to show all drivers
@app.route("/driver", methods = ["GET"])
def get_drivers():
    all_drivers = Driver.query.all()
    result = drivers_schema.dump(all_drivers)
    return jsonify(result.data)

#######################################################################################

# Endpoint to get driver detail by id
@app.route("/driver/<driver_id>", methods = ["GET"])
def driver_detail(driver_id):
    driver = Driver.query.get(driver_id)
    return driver_schema.jsonify(driver)

#######################################################################################

# Endpoint to delete driver
@app.route("/driver/<driver_id>", methods = ["DELETE"])
def driver_delete(driver_id):
    driver = Driver.query.get(driver_id)

    db.session.delete(driver)
    db.session.commit()
    
    return driver_schema.jsonify(driver)

#######################################################################################

# Endpoint to validate a driver that has logged in.
# Returns a boolean value
@app.route("/driver/validate", methods = ["POST"]) 
def driver_isValid():
    logging.info('Request is: %s' % request)
    company_id = request.json['company_id']
    password = request.json['password']
    driver = Driver.query.filter_by(company_id=company_id, password = password).first()

    if driver is None:
        return jsonify({"message": "Sorry, the credentials you entered are not valid"}), 400
    elif (driver.status != "Available"):
        current_trip = driver.current_trip
        current_trip_type = driver.current_trip_type

        return jsonify({
            "current_trip": driver.current_trip,
            "current_trip_type": driver.current_trip_type,
            "message": "DRIVER_UNAVAILABLE"
        })
    else:
        return jsonify({
            "message": "Welcome to Mercantile",
            "driver_id": driver.driver_id,
            "company_id": driver.company_id
            }), 200

#######################################################################################
############# VEHICLE ################ VEHILCE ################ VEHICLE ###############

# Endpoint to create new vehicle
@app.route("/vehicle", methods = ["POST"])
def vehicle_add():
    # Start info
    vehicle_id = request.json['vehicle_id']
    make = request.json['make']
    current_mileage = request.json['current_mileage']

    new_vehicle = Vehicle(vehicle_id, make, current_mileage)

    db.session.add(new_vehicle)
    db.session.commit()

    return vehicle_schema.jsonify(new_vehicle)

#######################################################################################

# Endpoint to validate a vehicle id and the start mileage entered by the User
@app.route("/vehicle/validate", methods = ["POST"])
def vehicle_isValid():

    vehicle_id = request.json['vehicle_id']
    current_mileage = request.json['current_mileage']


    vehicle = Vehicle.query.filter_by(vehicle_id=vehicle_id).first()

    if vehicle is None:
        return jsonify({"message": "Sorry, the car information you entered is not valid"}), 400
    elif (vehicle.status != "Available"):
        return jsonify({"message": "Sorry, car is already in use"}), 400
    elif (current_mileage < vehicle.current_mileage):
        return jsonify({"message": "MILEAGE_LOWER"}), 400
    elif (current_mileage - vehicle.current_mileage > 7):
        return jsonify({"message": "MILEAGE_GREATER"}), 400
    else:
        return jsonify({
            "message": "Vehicle Valid",
            "vehicle_id": vehicle.vehicle_id,
            "current_mileage": vehicle.current_mileage
            }), 200

#######################################################################################

# Endpoint to show all vehicles
@app.route("/vehicle", methods = ["GET"])
def get_vehicles():
    all_vehicles = Vehicle.query.all()
    result = vehicles_schema.dump(all_vehicles)
    return jsonify(result.data)

#######################################################################################

# Endpoint to get vehicle detail by id
@app.route("/vehicle/<vehicle_id>", methods = ["GET"])
def vehicle_detail(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)
    return vehicle_schema.jsonify(vehicle)

#######################################################################################

# End point to put a vehicle
@app.route("/vehicle/<vehicle_id>", methods = ["PUT"])
def vehicle_update(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)

    current_mileage = request.json['current_mileage']

    # TRIP_LIMIT
    if (current_mileage - vehicle.current_mileage > 500):
        return jsonify({
                "message": "MILEAGE_OVERLOAD"
        }), 400
    if (current_mileage < vehicle.current_mileage):
        return jsonify({
                "message": "MILEAGE_UNDERLOAD"
        }), 400

    vehicle.current_mileage = current_mileage

    db.session.commit()

    return jsonify({
        "message": "SUCCESS"
    })

#######################################################################################

# Endpoint to change the status of a vehicle
@app.route("/vehicle/status/<vehicle_id>", methods = ["PUT"])
def vehicle_status(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)

    status = request.json['status']
    vehicle.status = status

    db.session.commit()

    return vehicle_schema.jsonify(vehicle)

#######################################################################################

# Endpoint to delete vehicle
@app.route("/vehicle/<vehicle_id>", methods = ["DELETE"])
def vehicle_delete(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)

    
    db.session.delete(vehicle)
    db.session.commit()
    
    return vehicle_schema.jsonify(vehicle)

#######################################################################################

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True,host='0.0.0.0')

