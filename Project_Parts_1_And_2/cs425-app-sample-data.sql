
--CREATE A DATABASE NAMED AIRLINE AND RUN THIS FILE

create table airport
	("locIdentifier"	char(3) primary key not null, 
	 "name"			varchar(50), 
	 "country"		varchar(30),
	 "state"			varchar(20)
	);
create index loc_identifier_index on airport("locIdentifier");

create table customer
	("email"			varchar(50)  primary key not null,
	 "firstName"		varchar(20),
	 "middleName"		varchar(20),
	 "lastName"		varchar(20),
	 "homeAirport"	char(3),
	 foreign key ("homeAirport") references airport ("locIdentifier")
	);

create index email_index on customer("email");

create table airline
	("airlineCode"	char(2) primary key not null, 
	 "name"			varchar(50), 
	 "country"		varchar(30)
	);
create index airline_index on airline("airlineCode");
	 
create table address
	("addressID"			serial unique,
	 "email"				varchar(50) not null,
	 "streetAddress"		varchar(100),
	 "city"				varchar(50),
	 "state"				varchar(20),
	 "zip"				varchar(10),
	 primary key ("addressID", "email"),
	 foreign key ("email") references customer ("email")
	);

create table creditCard
	("email"					varchar(50) not null,
	 "addressID"				int,
     "creditCardNumber"		int not null unique, 
	 "expirationDate"			date,
	 "securityCode"			int,
	 primary key ("email", "creditCardNumber"),
     foreign key ("email") references customer ("email"),
     foreign key ("addressID") references address ("addressID")	
	);

create table booking
	("bookingID"				serial unique,
	 "flightClass"			varchar(10),
	 "email"					varchar(50),
	 "creditCardNumber"		int,
	 foreign key ("email") references customer ("email"),
	 foreign key ("creditCardNumber") references creditCard ("creditCardNumber")
	);

create index booking_index on booking("bookingID");

create table flight
	("airlineCode"			char(2) not null,
	 "flightNumber"			int not null,
	 "flightDate"				date not null,
	 "firstClassCapacity"		int,
	 "economyClassCapacity"	int,
	 "arrivalTime"			time,
	 "departureTime"			time,
	 "departureAirport"		char(3),
	 "destinationAirport"		char(3),
	 foreign key ("airlineCode") references airline ("airlineCode"),
	 foreign key ("departureAirport") references airport ("locIdentifier"),
	 foreign key ("destinationAirport") references airport ("locIdentifier"),
	 primary key ("airlineCode", "flightNumber", "flightDate")
	);

create table price
	("airlineCode"			char(2) not null,
	 "flightNumber"			int not null,
	 "flightDate"				date not null,
	 "firstClassPrice"		numeric(12,2),
	 "economyClassPrice"		numeric(12,2),
	 primary key ("airlineCode", "flightNumber", "flightDate"),
     foreign key ("airlineCode", "flightNumber", "flightDate") references flight ("airlineCode","flightNumber", "flightDate"),
	 constraint "firstClassPriceConst" check ("firstClassPrice">0),
	 constraint "economyClassPriceConst" check ("economyClassPrice">0)
	);


create table bookingFlight
	("bookingID"				int not null,
	 "airlineCode"			char(2) not null,
	 "flightNumber"			int not null,
	 "flightDate"				date not null,
	 primary key( "bookingID", "airlineCode", "flightNumber", "flightDate"),
	 foreign key ( "bookingID") references booking ("bookingID"),
     foreign key ("airlineCode", "flightNumber", "flightDate") references flight ("airlineCode","flightNumber", "flightDate")
    );

insert into airport values ('MCI','Kansas City Airport','United States','Kansas');
insert into customer values ('broc@test.com','Broc','Barling','Pashia','MCI');




INSERT INTO airport ("locIdentifier", name, country, state) VALUES ('MCI', 'Kansas City Airport', 'United States', 'Kansas');
INSERT INTO airport ("locIdentifier", name, country, state) VALUES ('MDW', 'Chicago Midway', 'United States', 'Illinois');
INSERT INTO airport ("locIdentifier", name, country, state) VALUES ('ORD', 'Chicago Ohare', 'United States', 'Illinois');
INSERT INTO airport ("locIdentifier", name, country, state) VALUES ('LGA', 'LaGuardia Airport', 'United States', 'New York');
INSERT INTO airport ("locIdentifier", name, country, state) VALUES ('SEA', 'Seattle-Tacoma Airport', 'United States', 'Washington');



INSERT INTO customer (email, "firstName", "middleName", "lastName", "homeAirport") VALUES ('broc@test.com', 'Broc', 'Barling', 'Pashia', 'MCI');
INSERT INTO customer (email, "firstName", "middleName", "lastName", "homeAirport") VALUES ('ted@test.com', 'Ted', 'Teddy', 'Tedderson', 'MCI');
INSERT INTO customer (email, "firstName", "middleName", "lastName", "homeAirport") VALUES ('bob@test.com', 'Bob', '', 'Smith', 'MDW');




INSERT INTO address ("addressID", email, "streetAddress", city, state, zip) VALUES (1, 'broc@test.com', '123 Sesame Street', 'Kansas City', 'Kansas', '12345');
INSERT INTO address ("addressID", email, "streetAddress", city, state, zip) VALUES (2, 'broc@test.com', '456 Sesame Street', 'Kansas City', 'Kansas', '12345');
INSERT INTO address ("addressID", email, "streetAddress", city, state, zip) VALUES (3, 'broc@test.com', '789 Sesame Street', 'Kansas City', 'Kansas', '12345');
INSERT INTO address ("addressID", email, "streetAddress", city, state, zip) VALUES (4, 'ted@test.com', '234 Sesame Street', 'Kansas City', 'Kansas', '12345');




INSERT INTO airline ("airlineCode", name, country) VALUES ('AA', 'Alaska Airlines', 'United States');
INSERT INTO airline ("airlineCode", name, country) VALUES ('SW', 'Southwest Airlines', 'United States');
INSERT INTO airline ("airlineCode", name, country) VALUES ('UA', 'United Airlines', 'United States');




INSERT INTO creditcard (email, "addressID", "creditCardNumber", "expirationDate", "securityCode") VALUES ('broc@test.com', 1, 1234556, '2021-05-07', 123);




INSERT INTO booking ("bookingID", "flightClass", email, "creditCardNumber") VALUES (5, 'First', 'broc@test.com', 1234556);




INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 101, '2021-06-01', 5, 10, '14:00:00', '12:00:00', 'MCI', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 102, '2021-06-01', 10, 20, '12:00:00', '10:00:00', 'MCI', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 103, '2021-06-01', 3, 5, '19:00:00', '17:00:00', 'MCI', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 106, '2021-06-02', 3, 5, '08:00:00', '06:00:00', 'MCI', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 104, '2021-06-02', 5, 10, '12:00:00', '10:00:00', 'LGA', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 105, '2021-06-02', 1, 1, '03:00:00', '01:00:00', 'LGA', 'ORD');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 107, '2021-06-02', 5, 10, '08:00:00', '06:00:00', 'MCI', 'LGA');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 109, '2021-06-02', 5, 10, '08:00:00', '06:00:00', 'MDW', 'MCI');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 110, '2021-06-03', 5, 10, '08:00:00', '06:00:00', 'MDW', 'MCI');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 111, '2021-06-04', 5, 10, '08:00:00', '06:00:00', 'MDW', 'MCI');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 112, '2021-06-04', 5, 10, '14:00:00', '12:00:00', 'MDW', 'SEA');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 113, '2021-06-05', 5, 10, '16:00:00', '14:00:00', 'SEA', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 114, '2021-06-03', 5, 10, '14:00:00', '12:00:00', 'MCI', 'SEA');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 115, '2021-06-05', 5, 10, '11:00:00', '08:00:00', 'SEA', 'MCI');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 116, '2021-06-02', 5, 10, '08:00:00', '04:00:00', 'LGA', 'SEA');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 117, '2021-06-04', 5, 10, '22:00:00', '18:00:00', 'SEA', 'LGA');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 118, '2021-06-03', 5, 10, '14:00:00', '12:00:00', 'MCI', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 119, '2021-06-05', 5, 10, '13:00:00', '11:00:00', 'MCI', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 120, '2021-06-04', 5, 10, '16:00:00', '12:00:00', 'SEA', 'MDW');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 121, '2021-06-03', 5, 10, '07:00:00', '04:00:00', 'MDW', 'LGA');
INSERT INTO flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 122, '2021-06-03', 5, 10, '15:00:00', '12:00:00', 'MDW', 'SEA');




INSERT INTO bookingflight ("bookingID", "airlineCode", "flightNumber", "flightDate") VALUES (5, 'UA', 107, '2021-06-02');
INSERT INTO bookingflight ("bookingID", "airlineCode", "flightNumber", "flightDate") VALUES (5, 'UA', 104, '2021-06-02');




INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 101, '2021-06-01', 400.00, 100.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 102, '2021-06-01', 250.00, 70.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 103, '2021-06-01', 300.00, 125.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 104, '2021-06-02', 150.00, 70.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 105, '2021-06-02', 220.00, 80.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 106, '2021-06-02', 100.00, 200.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 107, '2021-06-02', 150.00, 300.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 109, '2021-06-02', 400.00, 100.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 110, '2021-06-03', 400.00, 100.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 111, '2021-06-04', 300.00, 200.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 112, '2021-06-04', 150.00, 100.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 113, '2021-06-05', 120.50, 130.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 114, '2021-06-03', 175.00, 80.75);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 115, '2021-06-05', 75.00, 55.50);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 116, '2021-06-02', 200.50, 89.99);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 117, '2021-06-04', 75.00, 65.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 118, '2021-06-03', 90.00, 75.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 119, '2021-06-05', 45.50, 65.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 120, '2021-06-04', 99.99, 89.99);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 121, '2021-06-03', 300.00, 200.00);
INSERT INTO price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 122, '2021-06-03', 499.99, 300.00);




SELECT pg_catalog.setval('"address_addressID_seq"', 9, true);




SELECT pg_catalog.setval('"booking_bookingID_seq"', 11, true);




