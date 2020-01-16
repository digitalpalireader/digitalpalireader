import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { DoubleArrow } from '@material-ui/icons';
import { Grid, NativeSelect } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      fontSize: 'small',
      padding: 5,
    },
    typography: {
      padding: theme.spacing(0),
    },
  }),
);

export default function NavigationHistory() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignContent="stretch">
      <Paper className={classes.root}>
        <NativeSelect disableUnderline fullWidth>
          <option value="">-- History --</option>
          <option value={10}>Ten1</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
        <IconButton className={classes.iconButton}>
          <DoubleArrow />
        </IconButton>
      </Paper>
    </Grid>
  );
}
