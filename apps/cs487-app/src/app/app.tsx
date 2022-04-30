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
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  ChevronLeftIcon,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  theme,
  UsersIcon,
  Tooltip,
} from '@broc-ui';
import AppSideNav, { sideNavState } from './sidenav';
import { selectedUser } from '@cs487-app/state';
import { BrowserRouter, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    display: 'flex',
  },
  drawerPaperHidden: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBarSpacer: theme.mixins.toolbar,
  contentLogin: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    paddingLeft: 75,
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    // background: '#f0f0f0',
    flexGrow: 20,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
}));

function ButtonAppBar() {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const selectedCurrentUser = useRecoilValueLoadable(selectedUser);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar
          position="absolute"
          className={isOpen ? classes.appBarShift : classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            {selectedCurrentUser?.contents ? (
              <IconButton
                edge="start"
                color="secondary"
                aria-label="open drawer"
                onClick={() => setOpen(!isOpen)}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography
              variant="h6"
              className={classes.title}
              color="secondary"
            >
              Forum Application
            </Typography>
            {selectedCurrentUser?.contents ? (
              <Tooltip title="Account">
                <Link to="../account">
                  <Button color="secondary" startIcon={<UsersIcon />} />
                </Link>
              </Tooltip>
            ) : null}
            <Button color="secondary" href="../">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: selectedCurrentUser?.contents
              ? isOpen
                ? classes.drawerPaper
                : classes.drawerPaperClose
              : classes.drawerPaperHidden,
          }}
          open={isOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => setOpen(!isOpen)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <AppSideNav />
        </Drawer>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <main
            className={
              selectedCurrentUser?.contents &&
              selectedCurrentUser.state === 'hasValue'
                ? classes.content
                : classes.contentLogin
            }
          >
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xl" className={classes.container}>
              <AppRouter />
            </Container>
          </main>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}
export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ButtonAppBar />
      </BrowserRouter>
    </RecoilRoot>
  );
}
