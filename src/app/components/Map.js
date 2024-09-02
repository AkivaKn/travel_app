import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, Polyline, useLoadScript } from '@react-google-maps/api';
import { createMarker, createStartMarker, createEndMarker, createStartEnd } from '../utils/utils';

const containerStyle = {
  width: '100%',
  height: '400px',
};


const Map = ({ coordinates, locations}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [customIcons, setCustomIcons] = useState([]);
  const mapRef = useRef(null); // Ref for the map
  
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; 
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    if (isLoaded) {
      const icons = coordinates.map((loc, index) => {
        if (
          JSON.stringify(loc) === JSON.stringify(coordinates[0]) &&
          JSON.stringify(coordinates[0]) === JSON.stringify(coordinates[coordinates.length - 1])
        ) {
          return createStartEnd();
        } else if (JSON.stringify(loc) === JSON.stringify(coordinates[coordinates.length - 1])) {
          return createEndMarker();
        } else if (JSON.stringify(loc) === JSON.stringify(coordinates[0])) {
          return createStartMarker();
        } else {
          return createMarker();
        }
      });
      setCustomIcons(icons);
    }
  }, [coordinates, isLoaded]);


  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div className="my-4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={(map) => {
          mapRef.current = map; 
          if (coordinates.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();

            coordinates.forEach((position) => {
              bounds.extend(new window.google.maps.LatLng(position.lat, position.lng));
            });
            map.fitBounds(bounds);
          }
        }}
      >
        {/* Render Markers */}
        {coordinates.map((position, index) => (
          <Marker
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
            title={locations[index]}
            onClick={() => {
              setSelectedMarker({
                coords: position,
                place: locations[index]
              })}}
            icon={customIcons[index]}
          />
        ))}

        {/* Render Polyline with Arrows */}
        <Polyline
          path={coordinates.map((coord) => ({ lat: coord.lat, lng: coord.lng }))}
          options={{
            strokeColor: '#FF0000', // Red color for the line
            strokeOpacity: 1,
            strokeWeight: 2, // Line thickness
            icons: [
              {
                icon: {
                  path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 3, // Adjust the size of the arrow
                  strokeColor: '#FF0000', // Red color for the arrow
                  fillColor: '#FF0000', // Red color for the fill
                  fillOpacity: 1,
                },
                offset: '100%', // Position of the arrow on the line (100% for one arrow at the end)
                repeat: '100px', // Repeat distance for multiple arrows
              },
            ],
          }}
        />

        {/* Info Window */}
        {selectedMarker && (
          <InfoWindow
            // title={locations[coordinates.indexOf(selectedMarker)]}
            position={{ lat: selectedMarker.coords.lat, lng: selectedMarker.coords.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h4>{selectedMarker.place}</h4>
              {/* <p>
                Coordinates: {selectedMarker.coords.lat}, {selectedMarker.coords.lng}
              </p> */}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default React.memo(Map);
