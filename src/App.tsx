import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Home from './components/home/home';
import Locations from './components/locations-pages/locations';
import Incidents from './components/incidents-pages/incidents';
import SingleIncident from './components/incidents-pages/single-incident';
import { assignGeocode } from './shared/helper-functions';
import { IEvent  } from './shared/interfaces';
import theme from './assets/mui-theme';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps { }

interface IState {
  isFetching: boolean;
  geocodeFilter: any;
  page: number,
  allEvents: IEvent[],
  filteredEvents: IEvent[],
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFetching: false,
      geocodeFilter: {},
      page: 1,
      allEvents: [],
      filteredEvents: []
    }
  }

  componentDidMount() {
    this.setState({
      isFetching: true,
    });
    axios({
      method: 'get',
      url: 'http://api.policebrutality.io/v1/videos',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      let allEvents = assignGeocode(res.data.data);
      this.setState({
        isFetching: false,
        allEvents
      });
    });
  }

  render() {
    let allEvents = this.state.allEvents;
    return (
      <div>
        <Router>
          <MuiThemeProvider theme={theme}>

              <AppBar position="static">
                <Toolbar>
                  <Link to="/" color="secondary">
                    <Typography variant="h1">
                      policebrutality.io
                    </Typography>
                  </Link>
                </Toolbar>
              </AppBar>

              {this.state.isFetching ?
                <div className="full-width align-center">
                  <CircularProgress color="secondary" className="margin-large"/>
                </div>
              :
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/incidents"
                          render={(props) => <Incidents allEvents={allEvents}></Incidents>} />
                    <Route path="/incident/:id"
                          render={(props) => <SingleIncident allEvents={allEvents}></SingleIncident>} />
                    <Route path="/locations"
                          render={(props) => <Locations allEvents={allEvents}></Locations>} />
                </Switch>
              }

              <footer>
                <p>
                  Maintained on <a href="https://github.com/ErinOC/police-brutality-frontend">Github</a>.
                  Built using <a href="https://github.com/2020PB/police-brutality">crowd-sourced reports</a> backed up
                  to video by and made available via <a href="https://github.com/2020PB/police-brutality">API</a>.
                </p>
              </footer>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}
