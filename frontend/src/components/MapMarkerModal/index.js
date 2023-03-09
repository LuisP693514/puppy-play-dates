import reactDom from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarker, getMarker } from "../../store/markers";
import "./MapMarkerPopUp.css"

const MapMarkerPopUp = ({ markerId, open, profileClose }) => {
    debugger
    console.log(markerId)
    const dispatch = useDispatch();
    let currentMarker;

    
    currentMarker = useSelector(getMarker(markerId))
    

    useEffect(() => {
        dispatch(fetchMarker(markerId))
    }, [dispatch, markerId])
    if (!open && !markerId) return null

    return reactDom.createPortal(
        <>
            <div className="marker-modal">
                <button onClick={profileClose} className="modal-close">&times;</button>
                 <div>
                    <div>
                        <span>{currentMarker.name}</span>
                    </div>
                    <div>
                        <span>{currentMarker.address}</span>
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
