import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

// A custom theme for this app
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: green[900],
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: red.A400,
    },
    background: {
      default: '#fefefe',
    },
  },
});
