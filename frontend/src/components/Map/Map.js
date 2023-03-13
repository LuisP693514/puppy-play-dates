import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { googleMapApiKey } from '../../config/keys';
import './GoogleMap.css'
import data from './MapConfig.json'
import { fetchUsers, getUsers } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMarker, fetchMarkers, getMarkers } from '../../store/markers';
import { getCurrentUser, selectCurrentUser } from '../../store/session';
import { getLocation } from '../Utils/getLocation';
import { updateUser } from '../../store/users';
import ProfilePopUp from '../ProfileModal/ProfilePopUp';
import Filter from '../NavBar/Filter/Filter';
import MapMarkerPopUp from '../MapMarkerModal';


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
    const [showMarkerModal, setShowMarkerModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('')
    const [selectedMarker, setSelectedMarker] = useState('')

    const [center, setCenter] = useState({
        lat: 40.7361589,
        lng: -73.9939538
    })
    const [userStopDragging, setuserStopDragging] = useState(null);

    function generateFakeHours() {
        const hoursArray = []
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const startHour = Math.floor(Math.random() * 3) + 9
        const endHour = Math.floor(Math.random() * 4) + 5;
        const hours = daysOfWeek.map(day => `${day}: ${startHour}:00am - ${12 - endHour}:00pm`).join('\n');
        hoursArray.push(hours)
        return hoursArray
    }
      

    useEffect(() => {
        getLocation().then(coords => {
            setLatitude(coords[0])
            setLongitude(coords[1])
        })
      .catch(error => {
      });

    //   if(longitude && latitude){
    //     const geocoder = new window.google.maps.Geocoder();
    //     geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
    //         if (status === 'OK' && results.length > 0) {
    //           const country = results[0].address_components.find(
    //             (component) => component.types.includes('country')
    //           );
    //           if (country) {
    //             console.log(`The marker is in ${country.long_name}.`);
    //             // TODO: Check if the country is over land or water.
    //           }
    //         }
    //       });
    //   }
      const minLong = longitude - 0.0135462
        const maxLong = longitude + 0.0139538
        let randomLong;

        const minLat = latitude + 0.0058411
        const maxLat = latitude - 0.0061589
        let randomLat;

        const preseeded_locations_dogPark = []
        for (let i = 0; i < 12; i++) {
            // randomLong = (Math.random() * (maxLong - minLong)) + minLong;
            // randomLat = (Math.random() * (maxLat - minLat)) + minLat;
            // preseeded_locations_dogPark.push([randomLat, randomLong])
            // dispatch(createMarker({
            //     markerType: 'dogPark', 
            //     latitude: preseeded_locations_dogPark[i][0], 
            //     longitude: preseeded_locations_dogPark[i][1],
            //     name: `${faker.address.city()} Park`,
            //     address: faker.address.streetAddress(),
            //     hours: generateFakeHours()
            // }))
        }
        const preseeded_locations_vet = []
        for (let i = 0; i < 12; i++) {
            // randomLong = (Math.random() * (maxLong - minLong)) + minLong;
            // randomLat = (Math.random() * (maxLat - minLat)) + minLat;
            // preseeded_locations_vet.push([randomLat, randomLong])
            // dispatch(createMarker({
            //     markerType: 'vet', 
            //     latitude: preseeded_locations_vet[i + 1][0], 
            //     longitude: preseeded_locations_vet[i + 1][1],
            //     name: `${faker.name.lastName()} Veterinary Clinic`,
            //     address: faker.address.streetAddress(),
            //     hours: generateFakeHours()
            // }))
        }
        const preseeded_locations_groomer = []
        for (let i = 0; i < 12; i++) {
            // randomLong = (Math.random() * (maxLong - minLong)) + minLong;
            // randomLat = (Math.random() * (maxLat - minLat)) + minLat;
            // preseeded_locations_groomer.push([randomLat, randomLong])
            // dispatch(createMarker({
            //     markerType: 'vet', 
            //     latitude: preseeded_locations_groomer[i + 1][0], 
            //     longitude: preseeded_locations_groomer[i + 1][1],
            //     name: `${faker.name.lastName()} Veterinary Clinic`,
            //     address: faker.address.streetAddress(),
            //     hours: generateFakeHours()
            // }))
        }
        const preseeded_locations_petStore = []
        for (let i = 0; i < 12; i++) {
            // randomLong = (Math.random() * (maxLong - minLong)) + minLong;
            // randomLat = (Math.random() * (maxLat - minLat)) + minLat;
            // preseeded_locations_petStore.push([randomLat, randomLong])
            // dispatch(createMarker({
            //     markerType: 'vet', 
            //     latitude: preseeded_locations_petStore[i + 1][0], 
            //     longitude: preseeded_locations_petStore[i + 1][1],
            //     name: `${faker.name.lastName()} Veterinary Clinic`,
            //     address: faker.address.streetAddress(),
            //     hours: generateFakeHours()
            // }))
        }
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
            (
                <>
                    <Marker
                        clickable
                        onClick={() => {
                            setShowModal(true)
                            setSelectedUserId(user._id)
                        }}
                        position={{ lat: user.latitude - .0004, lng: user.longitude - .0001}} 
                        icon={{
                            url: user.profileImageUrl,
                            scaledSize: { width: 110, height: 110 }
                        }}
                    /> 
                    <Circle 
                        center={{ lat: user.latitude, lng: user.longitude }}    
                        radius={100}
                        options={{
                            strokeColor: "#FBC02D",
                            fillColor: "#FBC02D"
                        }}
                    />
                </>
            ) 
                :
           (  <Marker 
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
                            clickable
                            onClick={() => {
                                setShowModal(false)
                                setShowMarkerModal(true)
                                setSelectedMarker(marker._id)
                            }}
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
                            clickable
                            onClick={() => {
                                setShowModal(false)
                                setShowMarkerModal(true)
                                setSelectedMarker(marker._id)
                            }}
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
                            clickable
                            onClick={() => {
                                setShowModal(false)
                                setSelectedMarker(marker._id)
                                setShowMarkerModal(true)
                            }}
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
                            clickable
                            onClick={() => {
                                setShowModal(false)
                                setShowMarkerModal(true)
                                setSelectedMarker(marker._id)
                            }}
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
                            onClick={() => {
                                setShowMarkerModal(true)
                                setSelectedMarker(marker._id)
                                setShowModal(false)
                            }}
                            position={{ lat: 40.7356, lng: -73.9910 }}
                            icon={{
                            url: 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dogparkicon.png',
                            scaledSize: { width: 50, height: 50 }
                            }}
                        />
                    )
            }
    })} 
        {selectedMarker && <MapMarkerPopUp markerId={selectedMarker} open={showMarkerModal} profileClose={() => setShowMarkerModal(false)}></MapMarkerPopUp>}

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


// import { useEffect, useState} from "react";
// import reactDom from "react-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteFriendRequest } from "../../../store/friendRequests";
// import { fetchUser, getUser } from "../../../store/users";
// import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
// import './Friends.css'
// const FriendRequestInfoContainer = ({request, showPendingModal, setPendingShowModal, closeAllModals}) => {
//     const dispatch = useDispatch();
//     const receiver = useSelector(getUser(request.receiver))
//     const [selectedUserId, setSelectedUserId] = useState('')
//     const [prevId, setPrevId] = useState('')
//     useEffect(() => {
//         dispatch(fetchUser(request.receiver))
//     }, [dispatch])
//     const handleDeleteRequest= e => {
//         e.preventDefault();
//         dispatch(deleteFriendRequest(request._id))
//     }
    // const resetModal = () => {
    //     debugger
    //     if(prevUserId){
    //         const friend = document.getElementById(prevUserId)
    //         reactDom.unmountComponentAtNode(friend)
    //     }
    // }
    // let prevId
    // function handleSelected () {
    //     debugger
    //     if (user){
    //         let friend = document.getElementById(user)
    //         reactDom.unmountComponentAtNode(friend)
    //         setUser(receiver._id)
    //         setSelectedUserId(receiver._id)
    //     } else {
    //         debugger
    //         setUser(receiver._id)
    //         debugger
    //         setSelectedUserId(receiver._id)
    //     }
    //     debugger
    // }
    // const runTest = () => {
    //     debugger
    // }
//     const closeSiblings =() => {
//         debugger
//         if (prevId){
//             debugger
//             let friend = document.getElementById(prevId)
//             // friend.innerHTML = ""
//             reactDom.unmountComponentAtNode(friend)
//         } else {
//             debugger
//             setPrevId(receiver._id)
//             debugger
//         }
//     }
//     if (!receiver) return null;
//     return (
//         <div className="request-info-container" id="pending-container">
//             <button className="friend-info" onClick={() => {
//                 closeSiblings()
//                 closeAllModals();
//                 // resetModal()
//                 setPendingShowModal(true);
//                 // handleSelected()
//                 setSelectedUserId(receiver._id)
//                 // runTest()
//                 }}>
//                 <div>
//                     <img className="profile-friend-image" src={receiver.profileImageUrl}/>
//                 </div>
//             </button>
//             <div className="pending-info">
//                 <p>{receiver.name} & {receiver.puppyName}</p>
//                 <button onClick={handleDeleteRequest} className="delete-request" id="unfriend-button">-Delete Request-</button>
//             </div>
//             <div>
//                 {<ProfilePopUp userId={selectedUserId} open={showPendingModal} profileClose={() => setPendingShowModal(false)}></ProfilePopUp>}
//             </div>
//         </div>
//     )
// };
// export default FriendRequestInfoContainer;