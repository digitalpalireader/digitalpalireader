import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Select, Paper, Grid } from '@material-ui/core';
import NavigationToolbar from './navigationToolbar';
import { nikvoladi, G_kynames } from './navigation_common';

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

const sets = ['Vinaya', 'Dīgha', 'Majjhima', 'Saṃyutta', 'Aṅguttara', 'Khuddaka', 'Abhidhamma'];
const books = [nikvoladi['va'], nikvoladi['d'], nikvoladi['m'], nikvoladi['s'], nikvoladi['a'], G_kynames['k'], G_kynames['y']];
var booksDisplayed = [];

export default function Navigation() {
  const classes = useStyles();
  const [setList, setSet] = React.useState<string[]>([]);
  const [bookList, setBook] = React.useState<string[]>([]);

  const handleChangeSet = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        booksDisplayed = books[i];
      }
    }
    setSet(value);
  };

  const handleChangeBook = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setBook(value);
  };

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
                  onChange={handleChangeSet}
                  inputProps={{
                    id: 'select-multiple-native',
                  }}
                >
                  {sets.map(set => (
                    <option key={set} value={set}>
                      {set}
                    </option>
                  ))}
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
                  onChange={handleChangeBook}
                  inputProps={{
                    id: 'select-multiple-native',
                  }}
                >
                  {booksDisplayed.map(book => (
                    <option key={book} value={book}>
                      {book}
                    </option>
                  ))}
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
