import {
  Flight,
  FlightSearch,
  FlightWithClass,
  Price,
  SortOption,
  Connection,
} from '@airline/airline-interfaces';
import { renderDate } from '@broc-ui';
import {
  compareDesc,
  differenceInDays,
  differenceInHours,
  isAfter,
} from 'date-fns';
export const coerceDate = (dt: Date | string) => {
  if (typeof dt === 'string') {
    return new Date(dt);
  }
  return dt;
};

export const toDateWithTime = (time: string) => {
  const date = new Date();
  const times = time.split(':');
  if (times.length !== 3) {
    throw new Error('Wrong times');
  }
  const dateWithTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(times[0]),
    Number(times[1]),
    Number(times[2])
  );
  return dateWithTime;
};
export class FlightSearchHelpers {
  static toConnections(
    connections: FlightWithClass[][],
    prices: Price[]
  ): Connection[] {
    return connections.map((connection) => {
      const sum = connection.reduce((acc, value) => {
        const price = prices.find(
          (price) =>
            price.flightNumber === value.flightNumber &&
            price.airlineCode === value.airlineCode
        );
        if (!price) {
          return acc;
        }
        const amount = value.isFirstClass
          ? Number(price.firstClassPrice)
          : Number(price.economyClassPrice);
        return acc + amount;
      }, 0);
      return { flights: connection, totalPrice: sum };
    });
  }

  static getConnectionsWithReturn(
    flightSearch: FlightSearch,
    flights: FlightWithClass[],
    prices: Price[]
  ): {
    departConnections: Connection[];
    returnConnections: Connection[];
  } {
    const flightsFromDeparture = flights.filter(
      (flight) =>
        flight.departureAirport === flightSearch.departureAirport &&
        differenceInDays(
          coerceDate(flight.flightDate),
          coerceDate(renderDate(flightSearch.flightDate))
        ) === 0
    );

    const connections = flightsFromDeparture.reduce(
      (acc: FlightWithClass[][], flight) => {
        return [
          ...acc,
          ...this.getConnectionsRecursive(
            flightSearch.destinationAirport,
            flights,
            [flight]
          ),
        ];
      },
      []
    );
    const returnFlightsFromDeparture = flightSearch.returnDate
      ? flights.filter(
          (flight) =>
            flight.departureAirport === flightSearch.destinationAirport &&
            differenceInDays(
              coerceDate(flight.flightDate),
              coerceDate(renderDate(flightSearch.returnDate))
            ) === 0
        )
      : flightSearch.maxDays
      ? flights.filter(
          (flight) =>
            flight.departureAirport === flightSearch.destinationAirport &&
            differenceInDays(
              coerceDate(flight.flightDate),
              coerceDate(renderDate(flightSearch.flightDate))
            ) <= flightSearch.maxDays
        )
      : [];

    const returnConnections = returnFlightsFromDeparture.reduce(
      (acc: FlightWithClass[][], flight) => {
        return [
          ...acc,
          ...this.getConnectionsRecursive(
            flightSearch.departureAirport,
            flights,
            [flight]
          ),
        ];
      },
      []
    );
    const result = {
      departConnections: this.toConnections(connections, prices),
      returnConnections: this.toConnections(returnConnections, prices),
    };
    console.log({ connections, returnConnections });
    return result;
  }

  static getConnectionsRecursive(
    destination: string,
    flights: FlightWithClass[],
    currentPath: FlightWithClass[]
  ): FlightWithClass[][] {
    const currentFlight = currentPath[currentPath.length - 1];
    if (currentFlight.destinationAirport === destination) {
      return [currentPath];
    }
    const flightsAfter = flights.filter(
      (flight) =>
        flight.departureAirport === currentFlight.destinationAirport &&
        compareDesc(
          coerceDate(flight.flightDate),
          coerceDate(currentFlight.flightDate)
        ) >= 0 &&
        Math.abs(
          differenceInDays(
            coerceDate(flight.flightDate),
            coerceDate(currentFlight.flightDate)
          )
        ) < 2 &&
        Math.abs(
          differenceInDays(
            coerceDate(coerceDate(currentPath[0].flightDate)),
            coerceDate(flight.flightDate)
          )
        ) < 3 &&
        isAfter(
          toDateWithTime(flight.departureTime),
          toDateWithTime(currentFlight.arrivalTime)
        ) &&
        flight.isFirstClass === currentFlight.isFirstClass
    );

    const connections = flightsAfter.reduce(
      (acc: FlightWithClass[][], flight) => {
        return [
          ...acc,
          ...this.getConnectionsRecursive(destination, flights, [
            ...currentPath,
            flight,
          ]),
        ];
      },
      []
    );
    return connections;
  }
  static filterConnections(
    connections: Connection[],
    flightSearch: FlightSearch
  ) {
    const maxConnections = flightSearch.maxConnection
      ? connections.filter((c) => {
          return c.flights.length <= flightSearch.maxConnection;
        })
      : connections;
    console.log({ flightSearch, maxConnections });
    const priceConnections = flightSearch.price
      ? maxConnections.filter((connection) => {
          return connection.totalPrice <= flightSearch.price;
        })
      : maxConnections;
    const sorted =
      flightSearch.sortOption === SortOption.SortByPrice
        ? priceConnections.sort((a, b) => {
            return a.totalPrice - b.totalPrice;
          })
        : priceConnections.sort((a, b) => a.flights.length - b.flights.length);
    return sorted;
  }
}
