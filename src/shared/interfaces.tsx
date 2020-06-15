export interface ILink {
    key:  string | null;
    link: string;
    spaces_url: string;
  }

export interface IMarker {
  id: string;
  lat: number;
  lng: number;
}

export interface IEvent {
    id: string;
    edit_at: string;
    date: string;
    date_text: string;
    name: string;
    state: string;
    city: string;
    links: ILink[];
    marker: IMarker;
}

export interface IGeocodeCity {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}