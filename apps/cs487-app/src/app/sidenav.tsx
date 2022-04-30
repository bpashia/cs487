import * as React from 'react';
import {
  List,
  ListItem,
  Paper,
  ListItemIcon,
  ListItemText,
  HomeIcon,
  Collapse,
  ExpandLess,
  ExpandMore,
  makeStyles,
  createStyles,
  useTheme,
  Search,
} from '@broc-ui';
import { Link as RouterLink } from 'react-router-dom';
import { Message } from '@material-ui/icons';
import { atom, useRecoilState } from 'recoil';

export const sideNavState = atom<boolean>({
  key: 'sideNavState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 200,
    },
    lists: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(1),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listItem: {
      paddingLeft: theme.spacing(3),
    },
  })
);

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  open?: boolean;
  className?: string;
  onClick?: () => void;
}

const ListItemLink = (props: ListItemLinkProps) => {
  const { icon, primary, to, open, ...other } = props;

  return (
    <ListItem button={true} component={RouterLink} to={to} {...other}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
      {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
    </ListItem>
  );
};

export const AppSideNav = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Paper elevation={0}>
      <List aria-label="main">
        <ListItemLink
          to="/home"
          primary="Home"
          icon={<HomeIcon />}
          className={classes.listItem}
        />
        <ListItemLink
          to="/explore"
          primary="Explore"
          icon={<Search />}
          className={classes.listItem}
        />
        <ListItemLink
          to="/messages"
          primary="Message"
          icon={<Message />}
          className={classes.listItem}
        />
      </List>
    </Paper>
  );
};

export default AppSideNav;
