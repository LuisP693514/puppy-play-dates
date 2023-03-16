import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteDate, fetchDate, getDate} from "../../../store/dates";
import { getCurrentUser, selectCurrentUser } from "../../../store/session";
import { fetchUser, getUser } from "../../../store/users";
import CreateDate from "../../CreateDateForm/CreateDateForm";
import DatePopUp from "./DatePopUp";


const DateEventContainer = ({dateId, showDateModal, setShowDateModal, closeAllModals}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const date = useSelector(getDate(dateId));
    const otherUser = useSelector(getUser(date?.invitee))
    const sessionUser = useSelector(selectCurrentUser);
    const currentUser = useSelector(getUser(sessionUser?._id));
    const [showModal, setShowModal] = useState(false);
    const [showCreate, setShowCreate] = useState(false)

    useEffect(() => {
        if (dateId) {
            dispatch(fetchDate(dateId))
        }
        dispatch(getCurrentUser());
        dispatch(fetchUser(sessionUser._id))
        dispatch(fetchUser(date?.invitee))
    }, [dispatch]);

    if (!date) return null;
    if (!sessionUser) return null;
    if (!currentUser) return null;

    const handleDeleteClick = e => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleConfirmDelete = e => {
        e.preventDefault();
        dispatch(deleteDate(date?._id));
    }

    const handleCancelDelete = e => {
        e.preventDefault();
        setShowModal(false);
    }

    // const handleUpdateClick = () => {
    //     history.push('/editDate', {date})
    // }

        return (
            <>
                <div className="date-info-container">
                    {/* <button className="friend-info" onClick={() => {
                        closeAllModals()
                        setShowDateModal(true);
                        // setSelectedUserId(friendUser._id);
                    }}> */}
                    <div> <img className="profile-friend-image" src={otherUser.profileImageUrl}/></div>
                    {/* </button> */}
                    <div className="pending-info">
                        <p>Date with {otherUser?.username} & {otherUser?.puppyName}</p>
                        <div>{date?.name} on {date?.date.slice(0,10)}</div>
                        <div>{date?.description}</div>
                        <div className="handle-date-buttons">
                            <button id="reject-friend-button" onClick={handleDeleteClick}>-Delete-</button>
                            <button className="delete-request accept-button" onClick={() => {setShowCreate(true)}}>-Update-</button> 
                        </div>
                    </div>
                    {/* <div>Location:</div>
                    <div>Latitude: {date.latitude}</div>
                    <div>Longitude: {date.longitude}</div> */}
                </div>
                {showModal && (
                            <div className='delete-date-modal'>
                                <h2>Are you sure you want to delete your date?</h2>
                                <p>This cannot be undone!</p>
                                <div className='date-modal-buttons'>
                                    <button className='yes-date-delete-button' onClick={handleConfirmDelete}>
                                        Yes
                                    </button>
                                    <button className='no-date-delete-button' onClick={handleCancelDelete}>
                                        No
                                    </button>
                                </div>
                            </div>
                        )}
            <DatePopUp open={showDateModal} closeDate={setShowDateModal} date={date} otherUser={otherUser}/>
            <CreateDate open={showCreate} setShowCreate={setShowCreate} currentUser={currentUser} otherUser={otherUser} isUpdate={true} dateObj={date}/>
            </>
        )
};

export default DateEventContainer;