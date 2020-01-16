import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import NavigationToolbar from './navigationToolbar';
import NavigationQuickLinks from './navigationQuickLinks';
import NavigationMATSelector from './navigationMATSelector';
import NavigationBookSelector from './navigationBookSelector';
import NavigationBookHierarchy from './navigationBookHierarchy';
import NavigationHistory from './navigationHistory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(0.1),
    },
  }),
);

export default function Navigation() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper variant="outlined">
          <NavigationToolbar />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="outlined">
          <NavigationBookSelector />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="outlined">
          <NavigationMATSelector />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="outlined">
          <NavigationQuickLinks />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="outlined">
          <NavigationBookHierarchy />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="outlined">
          <NavigationHistory />
        </Paper>
      </Grid>
    </Grid>
  );
}
