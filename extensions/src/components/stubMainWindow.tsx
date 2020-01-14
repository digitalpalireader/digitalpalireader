import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Sidebar from './sidebar';
import StubContentPanel from './stubContentPanel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

function StubMainWindow() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <Sidebar></Sidebar>
        </Grid>
        <Grid item xs={3}>
          <StubContentPanel></StubContentPanel>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StubMainWindow;
