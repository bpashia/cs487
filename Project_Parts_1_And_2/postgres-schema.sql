
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
-- 	 foreign key ("airlineCode") references airline ("airlineCode"),
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
