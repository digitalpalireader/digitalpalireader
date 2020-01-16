import * as React from 'react';
import { Grid, Typography, Select, Box } from '@material-ui/core';
import { nikvoladi, G_kynames } from './navigation_common';

const sets = ['Vinaya', 'Dīgha', 'Majjhima', 'Saṃyutta', 'Aṅguttara', 'Khuddaka', 'Abhidhamma'];
const books = [nikvoladi['va'], nikvoladi['d'], nikvoladi['m'], nikvoladi['s'], nikvoladi['a'], G_kynames['k'], G_kynames['y']];
var booksDisplayed = [];

export default function NavigationBookSelector() {
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
    <Grid container direction="row">
      <Grid item xs={6} container direction="row" alignItems="stretch">
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            <Box fontWeight="bold">Set</Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            disableUnderline
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
          <Typography variant="subtitle1" align="center">
            <Box fontWeight="bold">Book</Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            disableUnderline
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
  );
}
