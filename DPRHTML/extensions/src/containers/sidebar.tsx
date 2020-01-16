import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HelpIcon from '@material-ui/icons/Help';
import Navigation from '../components/navigation';
import Tools from '../components/tools';
import Search from '../components/search';
import Help from '../components/help';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
    >
      {value === index && <Box p={0}>{children}</Box>}
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
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          style={{ minHeight: '0px' }}
        >
          <Tab label="Navigation" style={{ padding: '1px', margin: '0px' }} />
          <Tab label="Search" style={{ padding: '1px', margin: '0px' }} />
          <Tab label="Tools" style={{ padding: '1px', margin: '0px' }} />
          <Tab icon={<HelpIcon />} style={{ padding: '1px', margin: '0px' }} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Navigation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Search />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tools />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Help />
      </TabPanel>
    </div>
  );
}

export default Sidebar;
