import React from "react";
import Map from './map/map';
import Grid from '@material-ui/core/Grid';
import { Route } from "react-router-dom";

import { IEvent } from '../../shared/interfaces';
import SingleLocation from './single-location';

interface IProps {
  allEvents: any
}
interface IState {
  geocodeFilter: any;
  allEvents: IEvent[],
  filteredEvents: IEvent[],
}

export default class Locations extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        geocodeFilter: null,
        allEvents: [],
        filteredEvents: []
    };
  }

  public markerClickHandler(event: IEvent) {
    let filteredEvents = this.geocodeFilteredResults(event.marker);

    this.setState({
      geocodeFilter: event.marker,
      filteredEvents,
    });
  }

  private geocodeFilteredResults(geocodeInfo: any): IEvent[] {
    const allEventsCopy = JSON.parse(JSON.stringify(this.props.allEvents));

    return allEventsCopy.filter((event: IEvent) => {
      if (event.marker) {
        let meetsFilter = (geocodeInfo.lat === event.marker.lat) && (geocodeInfo.lng === event.marker.lng)
        if (meetsFilter) {
          return event;
        }
      }
    });
  }

  render() {
    let { filteredEvents } = this.state;
    let { allEvents } = this.props
    let selectedCity: any = filteredEvents[0];
    return (
        <div>
            { selectedCity ?
              <Grid item xs={12}>
                {selectedCity.city}, {selectedCity.state}
              </Grid>
            : null }

            <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key={API_KEY}"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        markerClickHandler={this.markerClickHandler.bind(this)}
                        events={allEvents}
                    />
                </Grid>

                <Grid item lg={8} md={6} xs={12}>
                   <Route path="/:name"
                          render={(props) => <SingleLocation events={filteredEvents} />} />
                </Grid>
            </Grid>
        </div>
    )
  }
}