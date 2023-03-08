import reactDom from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarker, getMarker } from "../../store/markers";
import "./MapMarkerPopUp.css"

const MapMarkerPopUp = ({ markerId, open, profileClose }) => {
    const dispatch = useDispatch();
    const currentMarker = useSelector(getMarker(markerId))

    useEffect(() => {
        dispatch(fetchMarker(markerId))
    }, [dispatch, markerId])

    if (!open) return null
    return reactDom.createPortal(
        <>
            <div className="marker-modal">
                <button onClick={profileClose} className="modal-close">&times;</button>
                <div>
                    TESTING
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};

export default MapMarkerPopUp;
