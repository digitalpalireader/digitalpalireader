import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import StubMainWindow from './containers/stubMainWindow';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  spacing: 10,
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <StubMainWindow />
  </MuiThemeProvider>
);

export default App;
