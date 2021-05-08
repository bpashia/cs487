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
import { Checkbox, Typography } from '@material-ui/core';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { selectedReturnConnection } from '@login';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const ReturnFlightTable = ({ rows }: { rows: Connection[] }) => {
  const [currentReturn, setCurrentReturn] = useRecoilState<Connection>(
    selectedReturnConnection
  );
  const classes = useStyles();
  console.log({ rows });
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell align="center">Flight</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Class</TableCell>
            <TableCell align="center">Number of Connections</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.flights[0].flightNumber}-${index}`}
              onClick={() => setCurrentReturn(row)}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={row === currentReturn}
                  // inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <Typography>{`${row.flights[0].departureAirport} -> ${
                  row.flights[row.flights.length - 1].destinationAirport
                } on ${renderDate(row.flights[0].flightDate)}`}</Typography>
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
