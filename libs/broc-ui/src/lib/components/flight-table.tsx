import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  FlightWithClass,
  Connection,
  FlightClass,
} from '@airline/airline-interfaces';
import { toCurrencyString } from './forms';
import { renderDate } from './display-date-time';
import { Link, Typography } from '@material-ui/core';
import { useEditableCardApi } from './cards';
import { useRecoilState } from 'recoil';
import { selectedConnection } from '@login';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const FlightTable = ({ rows }: { rows: Connection[] }) => {
  const classes = useStyles();
  const cardApi = useEditableCardApi();
  const [currentConnection, setConnection] = useRecoilState<Connection>(
    selectedConnection
  );
  const onClick = (row: Connection) => {
    setConnection(row);
    cardApi.toggleEditMode();
  };
  console.log({ rows });
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Flight</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Clas</TableCell>
            <TableCell align="center">Number of Connections</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row.flights[0].flightNumber}-${index}`}>
              <TableCell component="th" scope="row" align="center">
                <Link onClick={() => onClick(row)}>{`${
                  row.flights[0].departureAirport
                } -> ${
                  row.flights[row.flights.length - 1].destinationAirport
                } on ${renderDate(row.flights[0].flightDate)}`}</Link>
              </TableCell>
              <TableCell align="center">
                {toCurrencyString(row.totalPrice)}
              </TableCell>
              <TableCell align="center">
                {row.flights[0].isFirstClass
                  ? FlightClass.FirstClass.toString()
                  : FlightClass.EconomyClass.toString()}
              </TableCell>
              <TableCell align="center">{row.flights.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
