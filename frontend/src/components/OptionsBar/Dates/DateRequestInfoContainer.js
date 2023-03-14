import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../../../store/users";
import { deleteDateRequest } from "../../../store/dateRequests";
import DatePopUp from "./DatePopUp";

const DateRequestInfoContainer = ({request, showPendingDateModal, setShowPendingDateModal, closeAllModals}) => {
    const dispatch = useDispatch();
    const invitee = useSelector(getUser(request.invitee))

    useEffect(() => {
        dispatch(fetchUser(request.invitee))
    }, [dispatch])

    const handleDeleteRequest= e => {
        e.preventDefault();
        dispatch(deleteDateRequest(request._id))
    }

    if (!invitee) return null;
    

    return (
        <>
            <button onClick={() => {
                closeAllModals()
                setShowPendingDateModal(true)
            }}>
                <div>
                    <img className="profile-friend-image"src={invitee.profileImageUrl}/>
                    </div> 
            </button>
            <div className="pending-info">
                <div>
                    <p>{invitee.name} & {invitee.puppyName}</p>
                </div>
                <div>
                    {request.name} on {request?.date.slice(0,10)}
                </div>
                <div>
                    <button className="delete-request" onClick={handleDeleteRequest} id="delete-date-button">-Delete Request-</button>
                </div>
            </div>
            <DatePopUp open={showPendingDateModal} closeDate={setShowPendingDateModal} request={request} otherUser={invitee} incoming={false}/>
        </>

    )
};

export default DateRequestInfoContainer;