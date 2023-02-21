import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { googleMapApiKey } from '../../config/keys';
import './GoogleMap.css'
import data from './MapConfig.json'
import { fetchUsers, getUsers } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';

const containerStyle = {
    width: '95%',
    height: '90vh',
    margin: '0 auto'
};

const center = {
  lat: 40.7361589,
  lng: -73.9939538
};

const locations = [
    center,
    {lat: 40.7365, lng: -73.9904}
]

function MyGoogleMap() {
    const dispatch = useDispatch()
    const users = useSelector(getUsers)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    console.log(users)
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
            styles: data,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        }}
      >
      </GoogleMap>
  ) : <>Test</>

}
export default MyGoogleMap