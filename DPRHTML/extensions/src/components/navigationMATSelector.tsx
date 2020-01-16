import * as React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';

const NavigationMATSelector = () => (
  <Grid container justify="center" alignContent="stretch">
    <Grid item xs={4}>
      <Tooltip title="Switch to Mūla">
        <Button value="M" fullWidth>
          M
        </Button>
      </Tooltip>
    </Grid>
    <Grid item xs={4}>
      <Tooltip title="Switch to Aṭṭhakathā">
        <Button value="A" fullWidth>
          A
        </Button>
      </Tooltip>
    </Grid>
    <Grid item xs={4}>
      <Tooltip title="Switch to Ṭīkā">
        <Button value="T" fullWidth>
          T
        </Button>
      </Tooltip>
    </Grid>
  </Grid>
);

export default NavigationMATSelector;
