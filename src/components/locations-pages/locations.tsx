import React from "react";
import Map from './map/map';
import Grid from '@material-ui/core/Grid';
import { Route } from "react-router-dom";
import { IEvent } from '../../shared/interfaces';
import SingleLocation from './single-location';
import { styled } from '@material-ui/core/styles';
import theme from '../../assets/mui-theme';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

interface IProps {
  allEvents: any
}
interface IState {
  geocodeFilter: any;
  allEvents: IEvent[],
  filteredEvents: IEvent[],
}

const StyledGrid = styled(Grid)({
  // backgroundColor: theme.palette.secondary.main,
  backgroundColor: '#7cc3c3',
  height: '27px',
  fontWeight: 'bold',
  color: 'black',
  paddingLeft: '25px',
  lineHeight: '27px',
})

const StyledCard = styled(Card)({
  border: `1px solid lightgray`,
  borderRadius: 3,
  margin: 5,
  padding: 10,
});

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
    let API_KEY = '';
    let mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    return (
        <div>
            { selectedCity ?
              <StyledGrid item xs={12} className="subheader">
                {selectedCity.city}, {selectedCity.state}
              </StyledGrid>
            : null }

            <div className="margin">
              <Grid container spacing={3}>
                  <Grid item lg={4} md={6} xs={12}>
                    <StyledCard>
                      <Map
                          googleMapURL={mapsUrl}
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `400px` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                          markerClickHandler={this.markerClickHandler.bind(this)}
                          events={allEvents}
                      />
                      <p>Currently displays events from the largest 1000 cities in the U.S.</p>
                      <p>Full functionality coming soon.</p>
                    </StyledCard>
                  </Grid>

                  <Grid item lg={8} md={6} xs={12}>
                    {!selectedCity ?
                      <p>
                        Click a marker on the map to view items in that location.
                      </p>
                    : null}
                    <Route path="/:name"
                            render={(props) => <SingleLocation events={filteredEvents} />} />
                  </Grid>
              </Grid>
            </div>
        </div>
    )
  }
}