# Mercantile_Rental
/*---------------------------------------------------------------------------*/
/* Author: Vinay Ramesh                                                      */
/*                                                                           */
/* This is the readme file for the Mercantile Car Rental application. This   */
/* will outline the softwares and utilities used to create the app. This     */
/* documentation will consist of two sections: Server Development and UI     */
/* Development. Consider this version to be a working introduction.          */
/*---------------------------------------------------------------------------*/

Server Development:

	In order to create the server, I used a combination of Python and Flask.
	It is a tool specifically used for creating RESTful API's. Additionally,
	I integrated Python-Flask with Marshmallow, which helps convert python
	objects into JSON objects, so that the server may communicate with the 
	user interface properly.

	The server uses a database called SQLite in order to efficiently store
	the necessary information. There are several tables in the database.
	For example, there is a Client Trip table (with trips from companies
	that are clients of Mercantile), a Driver Trip table (with trips from
	drivers using the cars without having a client. These are the non-
	billable trips), an Individual Trip table (with trips from clients
	that are not companies, but rather individual people), a Company
	table (which lists all the companies that are currently clients), a
	Driver table (which stores all drivers working for Mercantile, along
	with their login passwords into the application), and a Vehicle table
	(which holds all the cars being used currently by Mercantile). The app
	uses these tables many times in order to validate what the user inputs 
	into the application. 

	The server is expected to have all driver username and passwords, and no 
	others, as one can't use the app without a proper username and password.
	There is no possibility of corruption, because the server has validation 
	endpoints, which the app utilizes to validate the fields the user has
	inputted.

App Development:

	In order to create the UI (user interface), I used the Facebook created 
	React Native. It allows me to create both an IOS and Android version of 
	this application. The initial starting state of this current project
	was built using the 'create-react-native-app' command. This command
	allows me to run a development server on my iPhone. However, it does 
	not have the Geolocation capabilities. For that, one needs to start
	the project with the command 'react-native init'. However, this command
	does not allow me to run a development server on my iPhone. Therefore,
	it is in the best interest to add the GPS location capabilities at the 
	very end. 

	I decided not to use any memory storing managers or reducers such as Redux.
	The motivation behind this decision is that there are not many screens
	to deal with each trip. Secondly, I felt that it was far easier to follow
	the code in the way I have written it.

Author's Notes:

	This is my first app development experience. I hope that it meets the requests 
	and desires of Mercantile Car Rentals.

	There are a few things to note about the Mercantile App Project in general:
		1. Before administrative use, a very simple web application will have to be
	created in order to interact with the server. 
		2. Ian Mugarura indicated that the Logo of Mercantile needs to be
	changed. I have kept the old Logo as is in the code. Please feel free to
	edit the Logo in the ../src/components/Logo file. 
		3. GPS Location is stored in the database using Latitudinal and
	Longitudinal Coordinates. The Location is also hand-written into the app
	by the drivers.
		4. Date is stored in the database as a String. Using the parse function,
	the string can be turned into a number (representing the number of milleseconds
	since January 1, 1970).
		5. The User's signature is saved in the database as a base64 encoded string.
		6. Please consult the ../src/utils/settings file to adjust the API URL.
		7. The configuration of the SQL database is SQLAlchemy. I know that Ian
	wanted Postgress. It should be easy to change the app.config in the python
	api.py file in order to change this configuration.

	I would like to acknowledge a few people in the creation of this
	application: 

		My acknowledgements:
			Exavier Rekura
			Paul Bagyenda 
			Ian Mugarura

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

SERVER; TOOLS (Python, Flask, Marshmallow)

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

	I used the Python-Flask tool in order to create the SQLite database in the 
server. As you can see, there are several linked tables including Trip (Client
Trip), SelfDriverTrip, DriverTrip, IndividualTrip, Company, Driver, and Vehicle.

	The python flask looks at a model described, and creates the proper database.
Marshmallow is an add-on that is used to return proper JSON objects to the 
User Interface.

	Trip holds data of those trips in which a company client, such as the Bank of 
Uganda, decides to take a ride with Mercantile Car Rentals.

	SelfDriverTrip holds data of those trips in which an individual person decides 
to rent a car, without one of the employed Mercantile drivers. 

	DriverTrip holds data of those trips in which a driver needs to ride (to 
pick up a client, to come back to Victoria Motors, etc.). The DriverTrip trips 
are not billable to any clients. 

	IndividualTrip holds the data of those trips where a client (not from a 
company like the Bank of Uganda) decides to take a ride with Mercantile.
They are still using one the Mercantile Drivers.

	Company holds all of the company names. Each company has a unique primary key
ID.

	Driver holds information on all of the drivers. Primarily sorted by a unique
primary key ID, this table holds License, phone number, email, name, password, and
company ID of each driver.

	Vehicle holds information on all of the vehicles being used by the company.
It includes the vehicle's vehicle ID, the make of the car, and the current mileage
on the car.

/*---------------------------------------------------------------------------*/

How to create the database:

	- Go into the RestAPI directory.
	- Start a command-line console
	- import db from api
	- db.create_all()
	- Exit the command-line console

/*---------------------------------------------------------------------------*/

API and Endpoints

/*---------------------------------------------------------------------------*/

Trip endpoints:
		
	@app.route("/trip", methods = ["POST"])
	This is an endpoint used in order to start a new client trip. The request
expects a JSON object with the following fields: "comp_id, vehicle_id, 
driver_id, start_date, departure, start_mileage, client, trip_type,
departure_geo_lat, departure_geo_long". This method will add these fields into
a new client trip into the database, with a unique trip_id.

	@app.route("/trip", methods = ["GET"])
	This is an endpoint used to get all the client trips in the database.

	@app.route("/trip/<trip_id>", methods = ["GET"])
	This is an endpoint used to get a specific client trip from the database.
The specific trip is indicated by the trip_id field in the url.

	@app.route("/trip/<trip_id>", methods = ["PUT"])
	This is an endpoint used to update the fields in a specific trip in the
database. The request expects a JSON object with the following fields:
"comp_id, vehicle_id, driver_id, start_date, departure, start_mileage, client,
end_date, destination, end_mileage, status, trip_type, destination_geo_lat,
destination_geo_long." The server will return a JSON object of the new trip 
with the updated fields.

	@app.route("/trip/signature/<trip_id>", methods=["PUT"])
	This is an endpoint used to update the signature of a client at the end of
a trip. The request expects a JSON object with the field "signature". The signature
that will arrive will be a base64 encoded version of the png signature. 

	@app.route("/trip/<trip_id>", methods = ["DELETE"])
	This is an endpoint used to delete a specific trip within the database.
The trip_id of the trip must be specific in the url. No JSON object is expected.

/*---------------------------------------------------------------------------*/

Self Trip Endpoints:

	@app.route("/self", methods = ["POST"])
	This is an endpoint used in order to start a new self trip. Very similar to
the ("/trip", methods = ["POST"]) endpoint.

	@app.route("/self", methods=["GET"])
	This is an endpoint used to get all the self trips in the database.

	@app.route("/self/<trip_id>", methods=["GET"])
	This is an endpoint used to get a specific self trip from the database.
The specific trip is indicated by the trip_id field in the url.

	@app.route("/self/<trip_id>", methods=["PUT"])
	This is an endpoint used to update the fields in a specific self trip in the
database. The request expects a JSON object with the following fields:
"vehicle_id, start_date, start_mileage, client, end_date, end_mileage, status, trip_type, email, license_number, phone, address, purpose" The server will return 
a JSON object of the new trip with the updated fields.

	@app.route("/self/signature/<trip_id>", methods=["PUT"])
	This is an endpoint used to update the signature of a client at the end of
a trip. The request expects a JSON object with the field "signature". The signature
that will arrive will be a base64 encoded version of the png signature. 

	@app.route("/self/validate", methods = ["POST"])
	This is an endpoint to validate a self trip. When someone in the app finishes
a self trip, they need to enter the phone number, license number, and vehicle ID
of the trip. This endpoint will return the trip if the credentials are correct, 
and will return an error message with a status of 400 if the credentials are not
correct.

	@app.route("/self/<trip_id>", methods = ["DELETE"])
	This is an endpoint used to delete a specific trip within the database.
The trip_id of the trip must be specific in the url. No JSON object is expected.

/*---------------------------------------------------------------------------*/

Driver Trip Endpoints:

	@app.route("/driver-trip", methods = ['POST'])
	Makes a new driver trip, similar to the previous two new-trip endpoints.

	@app.route("/driver-trip", methods = ["GET"])
	This is an endpoint used to get all the driver trips in the database.

	@app.route("/driver-trip/<trip_id>", methods = ["GET"])
	This is an endpoint used to get a specific driver trip from the database.
The specific trip is indicated by the trip_id field in the url.

	@app.route('/driver-trip/<trip_id>', methods = ['PUT'])
	This is an endpoint used to update the fields in a specific driver trip in the
database. The request expects a JSON object with the following fields:
"vehicle_id, driver_id, start_date, departure, start_mileage, end_date, destination,
end_mileage, status, destination_geo_lat, destination_geo_long" The server will 
return a JSON object of the new trip with the updated fields.

	@app.route("/driver-trip/<trip_id>", methods = ["DELETE"])
	This is an endpoint used to delete a specific trip within the database.
The trip_id of the trip must be specific in the url. No JSON object is expected.

/*---------------------------------------------------------------------------*/

Individual Trip Endpoints:

	@app.route("/indi-trip", methods = ['POST'])
	Makes a new individual trip, similar to the previous two new-trip endpoints.

	@app.route("/indi-trip", methods = ['GET'])
	This is an endpoint used to get all the driver trips in the database.

	@app.route("/indi-trip/<trip_id>", methods = ['GET'])
	This is an endpoint used to get a specific individual trip from the database.
The specific trip is indicated by the trip_id field in the url.

	@app.route('/indi-trip/<trip_id>', methods = ['PUT'])
	This is an endpoint used to update the fields in a specific driver trip in the
database. The request expects a JSON object with the following fields:
"vehicle_id, driver_id, start_date, departure, start_mileage, end_date, destination,
end_mileage, status, client, destination_geo_lat, destination_geo_long" The server 
will return a JSON object of the new trip with the updated fields.

	@app.route("/indi-trip/signature/<trip_id>", methods=["PUT"])
	This is an endpoint used to update the signature of a client at the end of
a trip. The request expects a JSON object with the field "signature". The signature
that will arrive will be a base64 encoded version of the png signature. 

	@app.route('/indi-trip/<trip_id>', methods = ['DELETE'])
	This is an endpoint used to delete a specific trip within the database.
The trip_id of the trip must be specific in the url. No JSON object is expected.

/*---------------------------------------------------------------------------*/

Company Endpoints:

	@app.route("/company", methods = ["POST"])
	Makes a new company in the server. The only field that the endpoint needs
is the name of the company.

	@app.route("/company/validate", methods=['POST'])
	Validates whether a company is included in the server. Returns the company
ID if the company exists, and an error message with status 400 if the company
does not exist.

	@app.route("/company", methods = ["GET"])
	This endpoint shows all companies that are currently clientelle of Mercantile

	@app.route("/company/<comp_id>", methods = ["GET"])
	This is an endpoint used to get a specific company from the database.
The specific company is indicated by the comp_id field in the url.

	@app.route("/company/<comp_id>", methods = ["DELETE"])
	This is an endpoint used to delete a specific company within the database.
The comp_id of the company must be specific in the url. No JSON object is expected.

/*---------------------------------------------------------------------------*/

Driver Endpoints:

	@app.route("/driver", methods = ["POST"])
	Makes a new driver in the server. The fields that the endpoint needs
are the name of the driver, password, company_id, license_number, email, and
phone number.

	@app.route("/driver/<driver_id>", methods = ["PUT"])
	This is an endpoint to change specifically the status, current_trip, and
current_trip_type of the driver. This is a very important endpoint. It is 
primarily used to change the status of a driver from Available to On a Trip, 
and vice versa.

	@app.route("/driver", methods = ["GET"])
	This is an endpoint to get all of the drivers currently saved in the 
database. 

	@app.route("/driver/<driver_id>", methods = ["GET"])
	This is an endpoint to get a particular driver out of the database. The
specific driver is indicated by the driver_id field in the url.

	@app.route("/driver/<driver_id>", methods = ["DELETE"])
	This is an endpoint used to delete a specific driver within the database.
The driver_id of the company must be specific in the url. No JSON object is expected.

	@app.route("/driver/validate", methods = ["POST"]) 
	This is an endpoint used to validate a driver as soon as they attempt to login.
Returns the appropriate response if the driver is currently on a trip or if the
login credentials are invalid. 

/*---------------------------------------------------------------------------*/

Vehicle Endpoints:

	@app.route("/vehicle", methods = ["POST"])
	Makes a new vehicle in the server. The fields that the endpoint needs
are the name of the vehicle_id, make, and current_mileage.

	@app.route("/vehicle/validate", methods = ["POST"])
	This is an endpoint to validate a vehicle. When a driver starts a trip,
this endpoint is used to validate: whether the vehicle exists in the database,
and if the current_mileage field is consistent with the current_mileage field
of the car in the database.

	@app.route("/vehicle", methods = ["GET"])
	This is an endpoint to get all the vehicles in the server.

	@app.route("/vehicle/<vehicle_id>", methods = ["GET"])
	This is an endpoint to get a particular vehicle in the database. The
specific vehicle is indicated by the vehicle_id field in the url.
 
	@app.route("/vehicle/<vehicle_id>", methods = ["PUT"])
	This is an endpoint to update the current_mileage that is in the vehicle.
This will not accept a current_mileage field that is less than the current_mileage
in the table. It will also not accept a mileage that is more than 500 miles
more than the current_mileage field.

	@app.route("/vehicle/status/<vehicle_id>", methods = ["PUT"])
	This is an endpoint to update the status of the vehicle. The specific vehicle 
is indicated by the vehicle_id field in the url.

	@app.route("/vehicle/<vehicle_id>", methods = ["DELETE"])
	This is an endpoint to delete a specific vehicle in the database. The
specific vehicle is indicated by the vehicle_id field in the url. 


/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

APPLICATION; TOOLS (React Native)

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/


This app was created using the react-native init command. This is so that I
may incorporate the react-native-signature-capture package, as well as the 
geolocation feature. 

Please use any development environment of your liking (Xcode, plugged-in
Android phone).

/*---------------------------------------------------------------------------*/

Flow of the application:

	As soon as the user opens the app, they are directed into the login page.
The driver will login to the application using their company ID (isued to 
them by Mercantile). 

Once logged in, the driver will be asked to choose either a Client Trip (These
are the trips that are made by regular company clients of Mercantile, i.e. 
Bank of Uganda), an Individual Trip (These trips are made by individual clients,
not ones from companies), and Driver Trips (unbillable trips that are made when
drivers use the cars while not driving a client [no signatures are taken for
the driver trips]). 

This documenation file will outline the process of the client trip, as the other
two types of trips are essentially the same, but utilizing different tables in 
the database.

Client Trip:
	The fields that the driver needs to fill out on the first page are the following:
	Company Name, Vehicle ID, Departure Location, Start Mileage, Client Name, and
	Trip Type (Has to be either 'Airport', 'Town Run', 'Up Country Trip', and
	'Out of Country Trip').

	None of the fields can be blank. The app then checks to see if the Company
	is in the server, if the Vehicle ID is in the server, if the start mileage
	matches the current_mileage field of the vehicle with that ID number, and
	if the Trip Type is valid.

	Once this has been logged, the server will update the Trip table, and 
	mark the trip along with the Start Date and Time, and the Geolocation of the
	driver at the time of beginning the trip. The status will be set to In
	Progress. At the same time, the driver's status will be changed to 'On a Trip'.
	The vehicle's status will be changed to IN USE. The driver's current_trip_type
	and current_trip fields will also be updated. 

	On the next screen, the driver will have to input the end mileage and Destination
	Location. It will not accept an end mileage that is less than the starting
	mileage. It will also not accept an end mileage more than 500 miles greater than
	the starting mileage. (This can be changed in the python api.py server file).

	Once the driver presses Finish Trip, a screen will the full details of the trip 
	will be displayed. This screen is meant to be shown to the clients. If everything
	is agreeable to the client, they can press confirm trip, and they will be directed
	to the sign in page. 

	Once the client has signed, and pressed okay, the trip is successfully saved in
	the server. The server is updated with the end GPS coordinates, as well as 
	a base64 endcoded string representing the user's signature. The driver's status
	and the vehicle's status are updated to Available. The vehicle's current_mileage
	is also updated. 

	This is also the flow of the other two trips, with slightly different fields,
	and with different tables in the SQL database.

/*---------------------------------------------------------------------------*/

Self Trip:

	The only remaining thing left is the Self Trip. For the self trip interface
	to be activated, a special company ID (Right now, it is 0000), and password
	(Right now, it is 'self') will be used to login. An alert asking whether to
	start a self trip or finish a trip will pop up. First, we will explore start
	trip. If we click Start Trip, this will direct the user
	to the Self Trip Initialization Page. On this page, the admin will fill out 
	the client's name, Driver's License Number, Email (optional), Home Address 
	(optional), Phone Number, Prupose of Trip, and the Vehicle ID and start
	mileage of the car they will be using. Once you press start a trip, the 
	trip will be logged into the server.

	When it is time to finish a trip, we can click the Finish Trip button when
	we login as a "Self-Driver." The User will be directed to the Self Trip
	Finalization page. On this page, the user will enter the vehicle ID of the
	car of the trip you wish to end, the client's phone number, and the client's
	license number. If these fields match an existing trip, then the user will
	be directed to the second Self Trip Finalization Trip. On this page, the user
	will enter the end mileage of the car. The optional fields of Email and
	Home Address will be available as well. (If these fields were filled out
	before, then there is no need to fill these fields again). 

	Once the Finish Trip button is pressed, a screen with the entire trip detail
	is shown on the screen. This screen is meant to be shown to the client before
	pressing the Confirm Trip button. Once the button is pressed, the client
	will be directed to the signature screen. The client will sign, and the trip is
	completed. In the SelfDriverTrip table, the trip will be updated with the
	base 64 encoded string representing the signature. 

	Each Self Trip consists of the following information:
		Vehicle ID
		Start Date
		Start Mileage
		Client Name
		End Mileage
		End Date
		Email
		License Number
		Phone
		Address
		Purpose
		Signature
		Status (In Progress or Completed)

	/*---------------------------------------------------------------------------*/
	/*---------------------------------------------------------------------------*/
	/*---------------------------------------------------------------------------*/
	/*---------------------------------------------------------------------------*/
	/*---------------------------------------------------------------------------*/

	DIGITAL SOLUTIONS


















