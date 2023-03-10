import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteDate, fetchDate, getDate} from "../../../store/dates";
import { fetchUser, getUser } from "../../../store/users";


const DateEventContainer = ({dateId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const date = useSelector(getDate(dateId));
    const otherUser = useSelector(getUser(date?.invitee))
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (dateId) {
            dispatch(fetchDate(dateId))
        }
        dispatch(fetchUser(date?.invitee))
    }, [dispatch]);

    if (!date) return null;

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

    const handleUpdateClick = () => {
        history.push('/editDate', {date})
    }

        return (
            <>
                <div className="date-info-container">
                    <p>Date with {otherUser?.username} & {otherUser?.puppyName}</p>
                    <div>{date?.name}</div>
                    <div>{date?.date.slice(0,10)}</div>
                    <div>{date?.description}</div>
                    {/* <div>Location:</div>
                    <div>Latitude: {date.latitude}</div>
                    <div>Longitude: {date.longitude}</div> */}
                </div>
                <div className="handle-date-buttons">
                    <button id="reject-friend-button" onClick={handleDeleteClick}>-Delete-</button>
                    <button className="delete-request" onClick={handleUpdateClick}>-Update-</button>
                    
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
            </>
        )
};

export default DateEventContainer;