import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Conversation, User, NewConversation } from '@interfaces';
import { toCurrencyString } from './forms';
import { renderDate } from './display-date-time';
import { Box, Button, Checkbox, Typography } from '@material-ui/core';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import {
  allUsers,
  selectedConversation,
  selectedUser,
  selectedNewConversation,
} from '@cs487-app/state';
import { BrsCard } from './cards';
import { Message, Send } from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

export const ConversationTable = ({ rows }: { rows: Conversation[] }) => {
  const [selected, setSelected] = useRecoilState<Conversation>(
    selectedConversation
  );
  const [
    currentSelectedNewConversation,
    setSelectedNewConversation,
  ] = useRecoilState<NewConversation>(selectedNewConversation);

  const currentSelectedUser = useRecoilValue<User>(selectedUser);
  const allCurrentUsers = useRecoilValue<User[]>(allUsers);
  const classes = useStyles();
  console.log({ rows });
  return (
    <BrsCard
      icon={<Message />}
      title={'Conversations'}
      action={
        <Button
          startIcon={<Send />}
          onClick={() =>
            setSelectedNewConversation({
              firstMessage: null,
              createdAt: new Date(),
              toEmail: null,
              subject: null,
            })
          }
        >
          New Conversation
        </Button>
      }
      content={
        <TableContainer>
          <Table className={classes.table} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={`${row.subject}-${row.createdAt}-${index}`}
                  onClick={() => setSelected(row)}
                  selected={!!selected?.id && selected?.id === row.id}
                  aria-checked={!!selected?.id && selected?.id === row.id}
                >
                  {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={row === currentReturn}
                  // inputProps={{ 'aria-labelledby': labelId }}
                /> */}
                  {/* </TableCell> */}

                  <TableCell component="th" scope="row" align="center">
                    <Typography>
                      {
                        allCurrentUsers.find(
                          (u) =>
                            row.users.find(
                              (userId) => userId !== currentSelectedUser.id
                            ) === u.id
                        ).email
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.subject}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {renderDate(row.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    />
  );
};
