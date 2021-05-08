import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LoginForm } from '@login';
import AppRouter from './app-router';
import { RecoilRoot } from 'recoil';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { theme } from '@broc-ui';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Airline Application
            </Typography>
            <Button color="inherit" href="../">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AppRouter />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
