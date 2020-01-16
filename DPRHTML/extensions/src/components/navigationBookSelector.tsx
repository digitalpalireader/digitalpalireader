import * as React from 'react';
import { Grid, Typography, Select, Box } from '@material-ui/core';

const NavigationBookSelector = () => (
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
);

export default NavigationBookSelector;
