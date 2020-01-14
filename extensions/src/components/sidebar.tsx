import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navigation from './navigation';
import Tools from './tools';
import Search from './search';
import HelpIcon from '@material-ui/icons/Help';
import Help from './help';

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
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Sidebar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
          <Tab label="Navigation" />
          <Tab label="Search" />
          <Tab label="Tools" />
          <Tab icon={<HelpIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Navigation></Navigation>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Search></Search>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tools></Tools>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Help></Help>
      </TabPanel>
    </div>
  );
}

export default Sidebar;
