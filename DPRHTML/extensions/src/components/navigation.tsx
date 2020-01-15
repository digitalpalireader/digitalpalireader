import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Select, Paper, Grid } from '@material-ui/core';
import NavigationToolbar from './navigationToolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item xs={12}>
          <NavigationToolbar />
        </Grid>
        <Grid item xs={12}>
          <Grid container item xs={12} direction="row">
            <Grid item xs={6} container direction="row" alignItems="stretch">
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="center">
                  Set
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Select
                  style={{ width: '100%' }}
                  multiple
                  native
                  inputProps={{
                    id: 'select-multiple-native',
                  }}
                >
                  <option value="v" label="Vinaya" />
                  <option value="d" label="Dīgha" />
                  <option value="m" label="Majjhima" />
                  <option value="s" label="Saṃyutta" />
                  <option value="a" label="Aṅguttara" />
                  <option value="k" label="Khuddaka" />
                  <option value="y" label="Abhidhamma" />
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={6} container direction="row" alignItems="stretch">
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="center">
                  Book
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Select
                  style={{ width: '100%' }}
                  multiple
                  native
                  inputProps={{
                    id: 'select-multiple-native',
                  }}
                >
                  <option label="1" />
                  <option label="2" />
                  <option label="3" />
                  <option label="4" />
                  <option label="5" />
                  <option label="6" />
                  <option label="7" />
                  <option label="8" />
                  <option label="9" />
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>MAT</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Quick link</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Book hierarchy</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>History</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
