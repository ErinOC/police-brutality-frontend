import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: cyan[800],
      light: cyan[500],
      dark: cyan[900],
    },
    primary: { // Reddish
      // main: '#5c0000',
      main: '#8f2a2a',
    },
    text: {
      primary: grey[900],
      secondary: '#FFFFFF'
    },
  },
  typography: {
    h1: {
      fontSize: '27px',
      color: '#FFFFFF'
    },
    h2: {
      color: grey[900]
    },
    h4: {
      color: grey[900],
      fontSize: '1.6rem',
    },
    button: {
        secondary: cyan[800]
    }
  }
});

export default theme;

