import { createMuiTheme } from '@material-ui/core/styles';
import { red, cyan, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: cyan[800],
      light: cyan[500],
      dark: cyan[900],
    },
    primary: { // Reddish
      main: '#5c0000',
      light: '#c45953',
      // #8f2a2a
    },
    text: {
      primary: grey[900],
      secondary: '#FFFFFF'
    },
  },
  typography: {
    h1: {
      fontSize: '20px',
      color: '#FFFFFF'
    },
    h2: {
      color: grey[900]
    },
    h5: {
      color: grey[900]
    },
    button: {
        secondary: cyan[800]
    }
  }
});

export default theme;

