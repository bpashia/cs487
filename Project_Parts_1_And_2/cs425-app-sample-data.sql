--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-05-08 11:39:38 CDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3321 (class 0 OID 18489)
-- Dependencies: 200
-- Data for Name: airport; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.airport ("locIdentifier", name, country, state) VALUES ('MCI', 'Kansas City Airport', 'United States', 'Kansas');
INSERT INTO public.airport ("locIdentifier", name, country, state) VALUES ('MDW', 'Chicago Midway', 'United States', 'Illinois');
INSERT INTO public.airport ("locIdentifier", name, country, state) VALUES ('ORD', 'Chicago Ohare', 'United States', 'Illinois');
INSERT INTO public.airport ("locIdentifier", name, country, state) VALUES ('LGA', 'LaGuardia Airport', 'United States', 'New York');
INSERT INTO public.airport ("locIdentifier", name, country, state) VALUES ('SEA', 'Seattle-Tacoma Airport', 'United States', 'Washington');


--
-- TOC entry 3322 (class 0 OID 18495)
-- Dependencies: 201
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.customer (email, "firstName", "middleName", "lastName", "homeAirport") VALUES ('broc@test.com', 'Broc', 'Barling', 'Pashia', 'MCI');
INSERT INTO public.customer (email, "firstName", "middleName", "lastName", "homeAirport") VALUES ('ted@test.com', 'Ted', 'Teddy', 'Tedderson', 'MCI');
INSERT INTO public.customer (email, "firstName", "middleName", "lastName", "homeAirport") VALUES ('bob@test.com', 'Bob', '', 'Smith', 'MDW');


--
-- TOC entry 3325 (class 0 OID 18514)
-- Dependencies: 204
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.address ("addressID", email, "streetAddress", city, state, zip) VALUES (1, 'broc@test.com', '123 Sesame Street', 'Kansas City', 'Kansas', '12345');
INSERT INTO public.address ("addressID", email, "streetAddress", city, state, zip) VALUES (2, 'broc@test.com', '456 Sesame Street', 'Kansas City', 'Kansas', '12345');
INSERT INTO public.address ("addressID", email, "streetAddress", city, state, zip) VALUES (3, 'broc@test.com', '789 Sesame Street', 'Kansas City', 'Kansas', '12345');
INSERT INTO public.address ("addressID", email, "streetAddress", city, state, zip) VALUES (4, 'ted@test.com', '234 Sesame Street', 'Kansas City', 'Kansas', '12345');


--
-- TOC entry 3323 (class 0 OID 18506)
-- Dependencies: 202
-- Data for Name: airline; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.airline ("airlineCode", name, country) VALUES ('AA', 'Alaska Airlines', 'United States');
INSERT INTO public.airline ("airlineCode", name, country) VALUES ('SW', 'Southwest Airlines', 'United States');
INSERT INTO public.airline ("airlineCode", name, country) VALUES ('UA', 'United Airlines', 'United States');


--
-- TOC entry 3326 (class 0 OID 18527)
-- Dependencies: 205
-- Data for Name: creditcard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.creditcard (email, "addressID", "creditCardNumber", "expirationDate", "securityCode") VALUES ('broc@test.com', 1, 1234556, '2021-05-07', 123);


--
-- TOC entry 3328 (class 0 OID 18546)
-- Dependencies: 207
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.booking ("bookingID", "flightClass", email, "creditCardNumber") VALUES (5, 'First', 'broc@test.com', 1234556);


--
-- TOC entry 3329 (class 0 OID 18563)
-- Dependencies: 208
-- Data for Name: flight; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 101, '2021-06-01', 5, 10, '14:00:00', '12:00:00', 'MCI', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 102, '2021-06-01', 10, 20, '12:00:00', '10:00:00', 'MCI', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 103, '2021-06-01', 3, 5, '19:00:00', '17:00:00', 'MCI', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 106, '2021-06-02', 3, 5, '08:00:00', '06:00:00', 'MCI', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 104, '2021-06-02', 5, 10, '12:00:00', '10:00:00', 'LGA', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 105, '2021-06-02', 1, 1, '03:00:00', '01:00:00', 'LGA', 'ORD');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 107, '2021-06-02', 5, 10, '08:00:00', '06:00:00', 'MCI', 'LGA');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 109, '2021-06-02', 5, 10, '08:00:00', '06:00:00', 'MDW', 'MCI');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 110, '2021-06-03', 5, 10, '08:00:00', '06:00:00', 'MDW', 'MCI');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 111, '2021-06-04', 5, 10, '08:00:00', '06:00:00', 'MDW', 'MCI');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 112, '2021-06-04', 5, 10, '14:00:00', '12:00:00', 'MDW', 'SEA');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 113, '2021-06-05', 5, 10, '16:00:00', '14:00:00', 'SEA', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 114, '2021-06-03', 5, 10, '14:00:00', '12:00:00', 'MCI', 'SEA');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 115, '2021-06-05', 5, 10, '11:00:00', '08:00:00', 'SEA', 'MCI');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 116, '2021-06-02', 5, 10, '08:00:00', '04:00:00', 'LGA', 'SEA');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 117, '2021-06-04', 5, 10, '22:00:00', '18:00:00', 'SEA', 'LGA');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 118, '2021-06-03', 5, 10, '14:00:00', '12:00:00', 'MCI', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('SW', 119, '2021-06-05', 5, 10, '13:00:00', '11:00:00', 'MCI', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('UA', 120, '2021-06-04', 5, 10, '16:00:00', '12:00:00', 'SEA', 'MDW');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 121, '2021-06-03', 5, 10, '07:00:00', '04:00:00', 'MDW', 'LGA');
INSERT INTO public.flight ("airlineCode", "flightNumber", "flightDate", "firstClassCapacity", "economyClassCapacity", "arrivalTime", "departureTime", "departureAirport", "destinationAirport") VALUES ('AA', 122, '2021-06-03', 5, 10, '15:00:00', '12:00:00', 'MDW', 'SEA');


--
-- TOC entry 3331 (class 0 OID 18595)
-- Dependencies: 210
-- Data for Name: bookingflight; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bookingflight ("bookingID", "airlineCode", "flightNumber", "flightDate") VALUES (5, 'UA', 107, '2021-06-02');
INSERT INTO public.bookingflight ("bookingID", "airlineCode", "flightNumber", "flightDate") VALUES (5, 'UA', 104, '2021-06-02');


--
-- TOC entry 3330 (class 0 OID 18583)
-- Dependencies: 209
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 101, '2021-06-01', 400.00, 100.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 102, '2021-06-01', 250.00, 70.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 103, '2021-06-01', 300.00, 125.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 104, '2021-06-02', 150.00, 70.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 105, '2021-06-02', 220.00, 80.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 106, '2021-06-02', 100.00, 200.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 107, '2021-06-02', 150.00, 300.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 109, '2021-06-02', 400.00, 100.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 110, '2021-06-03', 400.00, 100.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 111, '2021-06-04', 300.00, 200.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 112, '2021-06-04', 150.00, 100.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 113, '2021-06-05', 120.50, 130.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 114, '2021-06-03', 175.00, 80.75);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 115, '2021-06-05', 75.00, 55.50);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 116, '2021-06-02', 200.50, 89.99);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 117, '2021-06-04', 75.00, 65.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 118, '2021-06-03', 90.00, 75.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('SW', 119, '2021-06-05', 45.50, 65.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('UA', 120, '2021-06-04', 99.99, 89.99);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 121, '2021-06-03', 300.00, 200.00);
INSERT INTO public.price ("airlineCode", "flightNumber", "flightDate", "firstClassPrice", "economyClassPrice") VALUES ('AA', 122, '2021-06-03', 499.99, 300.00);


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 203
-- Name: address_addressID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."address_addressID_seq"', 9, true);


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 206
-- Name: booking_bookingID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."booking_bookingID_seq"', 11, true);


-- Completed on 2021-05-08 11:39:38 CDT

--
-- PostgreSQL database dump complete
--

