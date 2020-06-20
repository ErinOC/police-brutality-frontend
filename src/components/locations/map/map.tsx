import React from "react";
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    withScriptjs,
} from "react-google-maps";

import { IEvent } from '../../../shared/interfaces';

interface MapsParams {
    googleMapURL: string;
    loadingElement: any;
    containerElement: any;
    mapElement: any;
    events: IEvent[];
    markerClickHandler: any;
}


const Map = withScriptjs(withGoogleMap((props: MapsParams) => {
    return (
        <GoogleMap
            defaultZoom={3}
            defaultCenter={{ lat: 40, lng: -100 }}
        >
            {props.events.map((event: IEvent) => {
                if (event.marker) {
                    let position = { lat: event.marker.lat, lng: event.marker.lng };
                    return <Marker
                        key={event.id}
                        position={position}
                        onClick={() => {
                            return props.markerClickHandler(event)}
                        }
                    />
                }
            })}
        </GoogleMap>
    )
}));

export default Map;