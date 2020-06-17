import { createMuiTheme } from '@material-ui/core/styles';
import { red, cyan } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#292929'
    },
    secondary: {
      main: cyan[800],
      light: '#4fb3b',
      dark: '#005662',
    },
    text: {
        secondary: '#FFFFFF'
    },
  },
  typography: {
    button: {
        secondary: cyan[800]
    }
  }
});

export default theme;

