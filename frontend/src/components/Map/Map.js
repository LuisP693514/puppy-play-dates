import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { googleMapApiKey } from '../../config/keys';
import './GoogleMap.css'
import data from './MapConfig.json'


const containerStyle = {
    width: '95%',
    height: '90vh',
    margin: '0 auto'
};

const center = {
  lat: 40.7361589,
  lng: -73.9939538
};

function MyGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapApiKey
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    // const mapConfig = async () => {
    //     // debugger
    //     return await JSON.parse(MapStyle)
    // }


    // const styles = mapConfig()
    // debugger
    console.log(data)
    const zoom = 17
    map.setZoom(zoom)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        // zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
            styles: data
        }}
      >
      </GoogleMap>
  ) : <>Test</>
}

export default MyGoogleMap