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
import ProfilePopUp from '../ProfileModal/ProfilePopUp';
import Filter from '../NavBar/Filter/Filter';

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




function MyGoogleMap( { filteredMarkers } ) {
    const dispatch = useDispatch()
    const users = useSelector(getUsers)
    const markers = useSelector(getMarkers)
    const defaultTest = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/animal-g765307ffb_1280.png"
    const dogParkIcon = 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-park-icon.png'
    const veternarianIcon = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-vet-icon.png"
    const groomersIcon = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-groomer-icon.png"
    const petStoreIcon = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-pet-store-icon.png"
    const sessionUser = useSelector(selectCurrentUser)
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('')

    const [center, setCenter] = useState({
        lat: 40.7361589,
        lng: -73.9939538
    })
    const [userStopDragging, setuserStopDragging] = useState(null);

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
        
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const zoom = 17
        map.setZoom(zoom)

        setMap(map)
        
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

  const handleMapCenterChange = () => {
    if (map && userStopDragging) {
        const newCenter = map.getCenter();

        setCenter({
            lat: newCenter.lat(),
            lng: newCenter.lng()
        });
        setuserStopDragging(null);
      }
  };

  const handleUserStopDragging = () => {
    setuserStopDragging(true);
  }

 
  
    const filtered = markers.filter(marker => {
      return filteredMarkers.includes(marker.markerType) 
    });



  const hasLocation = sessionUser.longitude !== 0 && sessionUser.latitude !== 0;
  return isLoaded ? (
    <>
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
        onCenterChanged={handleMapCenterChange}
        onDragEnd={handleUserStopDragging}
      > 
        {Object.values(users).map(user => (
            user._id === sessionUser._id && hasLocation ?
            (<Marker 
                clickable
                onClick={() => {
                    setShowModal(true)
                    setSelectedUserId(user._id)
                }}
                position={{ lat: user.latitude, lng: user.longitude }} 
                icon={{
                    url: user.profileImageUrl,
                    scaledSize: { width: 110, height: 110 },
                }}
            /> ) 
                :
           ( <Marker 
                clickable
                onClick={() => {
                    setShowModal(true)
                    setSelectedUserId(user._id)
                }}
                position={{ lat: user.latitude, lng: user.longitude }} 
                icon={{
                    url: user.profileImageUrl,
                    scaledSize: { width: 75, height: 75 }

                }}
            />)
        ))}
            {<ProfilePopUp userId={selectedUserId} open={showModal} profileClose={() => setShowModal(false)}></ProfilePopUp>}

        {filtered.map(marker => {
            switch(marker.markerType) {
                case 'dogPark':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: dogParkIcon,
                                scaledSize: { width: 50, height: 50 }
                            }}
                        />
                    )
                case 'vet':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: veternarianIcon,
                                scaledSize: { width: 50, height: 50 }
                            }}
                        />
                    )
                case 'petStore':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: petStoreIcon,
                                scaledSize: { width: 50, height: 50 }
                            }}
                        />
                    )
                case 'groomer':
                    return (
                        <Marker 
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            icon={{
                                url: groomersIcon,
                                scaledSize: { width: 50, height: 50 }
                            }}
                        />
                    )
                default:
                    return (
                        <Marker 
                            position={{ lat: 40.7356, lng: -73.9910 }}
                            icon={{
                            url: 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dogparkicon.png',
                            scaledSize: { width: 50, height: 50 }
                            }}
                        />
                    )
            }
    })}
      </GoogleMap>
      <div className='map-center-button'> 
        <button onClick={() => {
            const currentUser = users[sessionUser._id]
            setCenter({
                lat: currentUser.latitude,
                lng: currentUser.longitude
            })
            map.setZoom(17)
        }}><i className="fa-solid fa-location-crosshairs crosshairs"></i>
        </button>
      </div>
    </>
  ) : <>...Loading</>

}
export default MyGoogleMap
