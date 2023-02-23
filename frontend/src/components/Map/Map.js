import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { googleMapApiKey } from '../../config/keys';
import './GoogleMap.css'
import data from './MapConfig.json'
import { fetchUsers, getUsers } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchMarkers, getMarkers } from '../../store/markers';
import { getCurrentUser, selectCurrentUser } from '../../store/session';
import { getLocation } from '../Utils/getLocation';
import { updateUser } from '../../store/users';
import ProfileModal from '../ProfileModal';

const containerStyle = {
    width: '100%',
    height: '91.6vh',
    margin: '0px auto',
    overflow: 'hidden',
    bottom: '0',
    position: 'absolute'
};

// const center = {
//   lat: 40.7361589,
//   lng: -73.9939538
// };




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
    const sessionUser = useSelector(selectCurrentUser)
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    
    // useEffect(() => {
    // //     getLocation().then(coords => {
    // //         console.log(coords)
    // //         setLatitude(coords[0])
    // //         setLongitude(coords[1])
    // //         dispatch(updateUser( { ...sessionUser, latitude, longitude } ))
    // //     })
    // //   .catch(error => {
    // //   });
    // }, [])

    useEffect(() => {
        getLocation().then(coords => {
            setLatitude(coords[0])
            setLongitude(coords[1])
        })
      .catch(error => {
      });
        dispatch(fetchUsers())
        dispatch(fetchMarkers())
        dispatch(updateUser( { ...sessionUser, latitude, longitude } ))
    }, [dispatch, latitude, longitude])
    
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey
    })
    
    const center = {
      lat: 40.7361589,
      lng: -73.9939538
    };

    // console.log(users)
    // console.log('this is session user below')
    // console.log(sessionUser)
        
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
    const zoom = 17
    map.setZoom(zoom)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const hasLocation = longitude > 0 && latitude > 0;
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
            user._id === sessionUser._id && hasLocation ?
            (<Marker 
                clickable
                onClick={() => {
                    // history.push('/');
                    console.log(user._id)
                    // {<ProfileModal userId={user._id} />}
                }}
                position={{ lat: user.latitude, lng: user.longitude }} 
                icon={{
                    url: user.profileImageUrl,
                    scaledSize: { width: 60, height: 60 }
                }}
            />)
                :
           ( <Marker 
                clickable
                onClick={() => {
                    // history.push('/');
                    console.log(user._id)
                    // {<ProfileModal userId={user._id} />}
                }}
                position={{ lat: user.latitude, lng: user.longitude }} 
                icon={{
                    url: user.profileImageUrl,
                    scaledSize: { width: 40, height: 40 }
                }}
            />)
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
      </GoogleMap>
  ) : <>...Loading</>

}
export default MyGoogleMap
