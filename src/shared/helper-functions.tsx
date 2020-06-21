
import cityData from '../assets/city-geocode-top-1000.json';
import { IEvent, IGeocodeCity } from '../shared/interfaces';

export const assignGeocode = (events: IEvent[]): IEvent[] => {
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