import React from 'react';
import {
  Card,
  makeStyles,
  Typography,
  Box,
  Button,
  Drawer,
  Tab,
  Tabs,
  AppBar,
  useTheme,
} from '../material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface TabData {
  label: string;
  icon: any;
  content: any;
}

export interface TabbedDialogueProps {
  tabs: TabData[];
}

export const TabbedCard = ({ tabs }: TabbedDialogueProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  console.log({ tabs });
  return (
    <Card className="brs-tabbed-dialogue">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            {tabs.map((tab, index) => {
              return (
                <Tab
                  key={tab.label}
                  label={tab.label}
                  icon={tab.icon}
                  // href="/drafts"
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        </AppBar>
        {tabs.map((tab, index) => (
          <TabPanel key={tab.label} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </Card>
  );
};

export default TabbedCard;
