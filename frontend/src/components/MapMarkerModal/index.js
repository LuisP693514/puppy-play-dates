import reactDom from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarker, getMarker } from "../../store/markers";
import "./MapMarkerPopUp.css"

const MapMarkerPopUp = ({ markerId, open, profileClose }) => {
    console.log(markerId)
    const dispatch = useDispatch();
    let currentMarker;
    let markerImg;

    
    currentMarker = useSelector(getMarker(markerId))
    console.log(currentMarker)
    switch(currentMarker.markerType){
        case 'dogPark': 
            markerImg = 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-park-icon.png'
        case 'vet':
            markerImg = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-vet-icon.png"
        case 'groomer':
            markerImg = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-groomer-icon.png"
        case 'petStore': 
            markerImg = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-pet-store-icon.png"
    }
    
    useEffect(() => {
        dispatch(fetchMarker(markerId))
    }, [dispatch, markerId])
    if (!open && !markerId) return null

    return reactDom.createPortal(
        <>
            <div className="marker-modal">
                <button onClick={profileClose} className="modal-close-marker">&times;</button>
                 <div>
                    <div className="modal-marker-popup">
                        <img className="profile-friend-image" src={markerImg}/>
                        <div className="right-side-modal">
                            <span>{currentMarker.name}</span>
                            <span>{currentMarker.address}</span>
                        </div>
                    </div>
                    <div>
                        <span>{currentMarker.hours}</span>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};

export default MapMarkerPopUp;
