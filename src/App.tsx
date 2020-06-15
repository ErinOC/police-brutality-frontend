import React from 'react';
import axios from 'axios';

import cityData from './assets/city-geocode-top-1000.json';
import { IEvent, IGeocodeCity } from './shared/interfaces';
import CardList from './components/card-list/card-list';
import PaginationComponent from './components/pagination/pagination';
import { Map } from './components/map/map';
import Navigation from './components/navigation/navigation';

interface IProps {
}

interface IState {
  geocodeFilter: any;
  allEvents: IEvent[];
  filteredEvents: IEvent[];
  page: number;
}

export class App extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      geocodeFilter: {},
      page: 1,
      allEvents: [],
      filteredEvents: []
    };
  }

  public markerClickHandler(event: IEvent) {
    let filteredEvents = this.geocodeFilteredResults(event.marker);

    this.setState({
      geocodeFilter: event.marker,
      filteredEvents,
      page: 1
    });
  }

  public paginationClickHandler(page: number) {
    this.setState({
      page
    });
  }

  public menuClickHandler(type: string) {
    if (type === 'all') {
      this.setState({
        page: 1,
        filteredEvents: this.state.allEvents,
        geocodeFilter: {},
      });
    }
  }

  componentDidMount() {
      axios({
        method: 'get',
        url: 'http://api.policebrutality.io/v1/videos',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        let allEvents = this.assignGeocode(res.data.data);
        this.setState({
          allEvents,
          filteredEvents: allEvents,
        });
        this.paginationClickHandler(1);
      })
  }

  private assignGeocode(events: IEvent[]): IEvent[] {
    events.forEach((event: IEvent) => {
      cityData.forEach((city:  IGeocodeCity) => {
        let isMatch = (event.city === city.city && event.state === city.state);
        if (isMatch) {
          event.marker = {
            id: event.id,
            lat: city.latitude,
            lng: city.longitude
          }
        }
      });
    });

    return events;
  }

  private geocodeFilteredResults(geocodeInfo: any): IEvent[] {
    const allEventsCopy = JSON.parse(JSON.stringify(this.state.allEvents));

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
    let { page, filteredEvents } = this.state;
    const map = (
      <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key={API_KEY}"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markerClickHandler={this.markerClickHandler.bind(this)}
          events={this.state.allEvents}
      />
    );
    const cardList = (
      <CardList
        page={page}
        events={filteredEvents}>
      </CardList>
    )
    const pagination = (
      <PaginationComponent
        events={filteredEvents}
        paginationClickHandler={this.paginationClickHandler.bind(this)}
        page={page}>
      </PaginationComponent>
    )
    return (
      <div>
        <Navigation
          cardList={cardList}
          map={map}
          menuClickHandler={this.menuClickHandler.bind(this)}
          pagination={pagination}>
        </Navigation>
      </div>
    );
  }
}

export default App;


