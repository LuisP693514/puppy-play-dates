import reactDom from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarker, getMarker } from "../../store/markers";
import "./MapMarkerPopUp.css"

const MapMarkerPopUp = ({ markerId, open, profileClose }) => {
    debugger
    // console.log(markerId)
    const dispatch = useDispatch();
    let currentMarker;
    let markerImg;

    
    currentMarker = useSelector(getMarker(markerId))
    // console.log(currentMarker)
    switch(currentMarker.markerType){
        case 'dogPark': 
            markerImg = 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-park-icon.png'
            break;
        case 'vet':
            markerImg = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-vet-icon.png"
            break;
        case 'groomer':
            markerImg = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-groomer-icon.png"
            break;
        case 'petStore': 
            markerImg = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/orange-pet-store-icon.png"
            break;
        default:
            markerImg = ""
            break;
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
                        <div> 
                            <img className="business-profile-image" src={markerImg}/>
                        </div>
                        <div className="business-info">
                            <h4>{currentMarker.name}</h4>
                            <h4>{currentMarker.address}</h4>
                        </div>
                    </div>
                    <div>
                        <div>{currentMarker.hours}</div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};

export default MapMarkerPopUp;
