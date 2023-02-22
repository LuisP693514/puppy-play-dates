import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { googleMapApiKey } from '../../config/keys';
import './GoogleMap.css'
import data from './MapConfig.json'
import { fetchUsers, getUsers } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchMarkers, getMarkers } from '../../store/markers';

const containerStyle = {
    width: '100%',
    height: '91.6vh',
    margin: '0px auto',
    overflow: 'hidden',
    bottom: '0',
    position: 'absolute'
};

const center = {
  lat: 40.7361589,
  lng: -73.9939538
};


function MyGoogleMap() {
    const dispatch = useDispatch()
    const users = useSelector(getUsers)
    const markers = useSelector(getMarkers)
    const history = useHistory()
    const defaultTest = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/animal-g765307ffb_1280.png"
    const dogParkIcon = 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dogparkicon.png'
    const veternarianIcon = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/vet.png"
    const groomersIcon = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/pets-hair-salon.avif"
    const petStoreIcon = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/pet+store.png"

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchMarkers())
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey
    })
    
    console.log(users)
        
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
    const zoom = 17
    map.setZoom(zoom)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  
    markers.map(marker => {
        switch(marker.markerType) {
            case 'dogPark':
                const parkIcon = {url: dogParkIcon,
                    scaledSize: { width: 40, height: 40 }}
            case 'vet':
                const vetIcon = {url: veternarianIcon,
                    scaledSize: { width: 40, height: 40 }}
            case 'petStore':
                const storeIcon = {url: petStoreIcon,
                    scaledSize: { width: 40, height: 40 }}
            case 'groomer':
                const groomerIcon = {url: groomersIcon,
                    scaledSize: { width: 40, height: 40 }}
        }
    })

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
            fullscreenControl: false,
        }}
      >
        {users.map(user => (
            <Marker 
                clickable
                onClick={() => {
                    history.push('/');
                }}
                position={{ lat: user.latitude, lng: user.longitude }} 
                icon={{
                    url: user.profileImageUrl,
                    scaledSize: { width: 60, height: 60 }
                }}
            />
        ))}
        {markers.map(marker => {
            switch(marker.markerType) {
                case 'dogPark':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: dogParkIcon,
                                scaledSize: { width: 40, height: 40 }
                            }}
                        />
                    )
                case 'vet':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: veternarianIcon,
                                scaledSize: { width: 40, height: 40 }
                            }}
                        />
                    )
                case 'petStore':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: petStoreIcon,
                                scaledSize: { width: 40, height: 40 }
                            }}
                        />
                    )
                case 'groomer':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: groomersIcon,
                                scaledSize: { width: 40, height: 40 }
                            }}
                        />
                    )
                default:
                    return (
                        <Marker 
                            position={{ lat: 40.7356, lng: -73.9910 }}
                            icon={{
                            url: 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dogparkicon.png',
                            scaledSize: { width: 40, height: 40 }
                            }}
                        />
                    )
            }
    })}
        {/* {parks.map(park => (
            <Marker 
            position={{ lat: park.latitude, lng: park.longitude }} 
            icon={{
                url: park.profileImageUrl,
                scaledSize: { width: 40, height: 40 }
            }}
        />
        ))} */}
        {/* <Marker 
            position={{ lat: 40.7356, lng: -73.9910 }}
            icon={{
                url: 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dogparkicon.png',
                scaledSize: { width: 40, height: 40 }
            }}
        /> */}
      </GoogleMap>
  ) : <>...Loading</>

}
export default MyGoogleMap
