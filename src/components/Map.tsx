import { GOOGLE_MAP_APIKEY } from '@env';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../store/slices/navSlice';

const Map = () => {
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);
  const mapRef = useRef<MapView>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      initialRegion={{
        // latitude: 37.78825,
        // longitude: -122.4324,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        latitude: origin?.location.lat!,
        longitude: origin?.location.lng!,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      className="flex-1"
      mapType="mutedStandard"
    >
      {origin && destination && (
        <MapViewDirections
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apikey={GOOGLE_MAP_APIKEY}
          strokeWidth={3}
          strokeColor="black"
          onReady={(response) => {
            dispatch(
              setTravelTimeInformation({
                distance: response.distance,
                duration: response.duration,
              })
            );
          }}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
