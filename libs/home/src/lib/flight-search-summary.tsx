import {
  Api,
  Connection,
  Flight,
  FlightSearch,
  FlightWithClass,
  Price,
} from '@airline/airline-interfaces';
import { FlightTable, Loading, Typography } from '@broc-ui';
import { currentSearchResults, selectedReturnConnections } from '@login';
import React from 'react';
import { useAsync } from 'react-use';
import { useRecoilState } from 'recoil';
import { FlightSearchHelpers } from './flight-search.helpers';

export const FlightSearchSummary = ({
  flightSearch,
}: {
  flightSearch: FlightSearch;
}) => {
  console.log({ flightSearch });
  const [searchResults, setSearchResults] = useRecoilState<{
    economyFlights: Flight[];
    firstClassFlights: Flight[];
  }>(currentSearchResults);
  const [currentReturnConnections, setReturnConnections] = useRecoilState<
    Connection[]
  >(selectedReturnConnections);
  const result = useAsync(async () => {
    const { data } = await Api.get<Price[]>(`api/local/customers/prices`);
    //   console.log('PRICES',{data})
    const { economyFlights, firstClassFlights } = searchResults;
    const flights: FlightWithClass[] = [
      ...economyFlights.map((econ) => ({ ...econ, isFirstClass: false })),
      ...firstClassFlights.map((first) => ({ ...first, isFirstClass: true })),
    ];
    const {
      departConnections,
      returnConnections,
    } = FlightSearchHelpers.getConnectionsWithReturn(
      flightSearch,
      flights,
      data
    );

    const filteredDepartConnections = FlightSearchHelpers.filterConnections(
      departConnections,
      flightSearch
    );
    const filteredReturnConnections = FlightSearchHelpers.filterConnections(
      returnConnections,
      flightSearch
    );
    setReturnConnections(filteredReturnConnections);
    return filteredDepartConnections;
  }, [searchResults]);

  // console.log({filteredDepartConnections})
  return result.loading ? (
    <Loading />
  ) : result.value && result.value.length ? (
    <FlightTable rows={result.value} />
  ) : (
    <Typography>No Flights Found Matching Search</Typography>
  );
};
