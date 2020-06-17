import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 550;
const mobileDrawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    color: 'white',
  },
  mobileMenuButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    color: 'darkgray',
    width: '50px',
    float: 'left'
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    backgroundColor: '#292929',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'lightgray'  //For now.
  },
  mobileDrawerPaper: {
    width: mobileDrawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Navigation({map, cardList, pagination, menuClickHandler}: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          key='all'
          onClick={() => {
            return menuClickHandler('all');
          }}
        >
          <ListItemText primary='Show All' />
        </ListItem>
        <Divider />
        <ListItem button key='city'>
          <ListItemText primary='Sort by City' />
        </ListItem>
        {map}
        <Divider />
      </List>
    </div>
  );

  const container = undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            PoliceBrutality.io
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="filter results">
        <Hidden smUp implementation="css">
          {/* MOBILE */}
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.mobileDrawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.mobileMenuButton}>
              <MenuIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>

        {/* DESKTOP */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        {cardList}
        <Divider />
        {pagination}
      </main>
    </div>
  );
}