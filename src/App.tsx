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

import Home from './components/home/home';
import Locations from './components/locations-pages/locations';
import Incidents from './components/incidents-pages/incidents';
import SingleIncident from './components/incidents-pages/single-incident';
import { assignGeocode } from './shared/helper-functions';
import { IEvent  } from './shared/interfaces';

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
    if (this.state.isFetching) {
      return <div>...loading</div>
    }
    return (
      <div>
        <Router>

          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5">
                  <Link to="/">policebrutality.io</Link>
              </Typography>
            </Toolbar>
          </AppBar>

          <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/incidents"
                     render={(props) => <Incidents allEvents={allEvents}></Incidents>} />
              <Route path="/incident/:id"
                     render={(props) => <SingleIncident allEvents={allEvents}></SingleIncident>} />
              <Route path="/locations"
                     render={(props) => <Locations allEvents={allEvents}></Locations>} />
          </Switch>

        </Router>
      </div>
    );
  }
}
