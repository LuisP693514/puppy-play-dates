import { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDates, getDates } from '../../../store/dates';
import { getCurrentUser, selectCurrentUser } from '../../../store/session';
import { fetchDateRequests, getDateRequests } from '../../../store/dateRequests';
import DateEventContainer from './DateEventContainer';
import DateRequestContainer from './DateRequestContainer';
import DateRequestInfoContainer from './DateRequestInfoContainer';
import DatePopUp from './DatePopUp';
import './DateShowPage.css';

const DateShowPage = ({open, datesClose}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const dates = useSelector(getDates);
    const dateRequests = useSelector(getDateRequests);
    const [showDateModal, setShowDateModal] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [showPendingModal, setShowPendingModal] = useState(false)

    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchDates(currentUser._id))
        dispatch(fetchDateRequests(currentUser._id))
    }, [dispatch]);

    const closeAllModals = () =>{
        setShowDateModal(false)
        setShowRequestModal(false)
        setShowPendingModal(false)
    }

    const datesList = () => {
        if (dates.length){
            return (
                <>
                <div id='date-index'>
                    {dates.map(date =>{ 
                    return ( <div id='date-item'>
                                    <DateEventContainer dateId={date._id} key={date._id} showDateModal={showDateModal} setShowDateModal={setShowDateModal} closeAllModals={closeAllModals}/>
                                </div>)}
                    )}
                </div>
                </>
            )

        } else {
            return (
                <div className="date-spacer"> Select a friend's profile and click Create Play Date to begin.</div>
            )
        }
    }

    const request = () => {
        if (pendingInvitee.length){
            return (
                <>
                    <div className='date-request-index-container date-list'> 
                        <h6 id='date-requests date-list'>Date Requests:</h6>
                    </div>
                    <div id='date-request-index'>
                        {pendingInvitee.map(request => {
                            return (<div id='date-item'>
                                    <DateRequestContainer request={request} key={request._id} currentUser={currentUser} showRequestModal={showRequestModal} setShowRequestModal={setShowRequestModal} closeAllModals={closeAllModals}/>
                                    </div>)
                        })}
                    </div>
                </>
            )
        }
    }

    const pending = () => {
        if (pendingCreator.length){
            return (
                <>
                    <div className='date-pending-index-container date-list'>
                        <h6 id='date-requests date-list'>Pending Date Requests:</h6>
                    </div>
                    <div id='date-request-index'>
                        {pendingCreator.map(request => {
                            return (<div id='date-item'>
                                        <DateRequestInfoContainer request={request} key={request._id} showPendingModal={showPendingModal} setShowPendingModal={setShowPendingModal} closeAllModals={closeAllModals}/>
                                    </div>)
                        })}
                     </div>
                </>
            )
            
        }
    }

    if (!dates) return null;
    if (!dateRequests) return null;
    
    const pendingCreator = dateRequests.filter(request => (
        request?.status === 'pending' && request?.creator === currentUser._id
    ));

    const pendingInvitee = dateRequests.filter(request => (
        request?.status === 'pending' && request?.invitee === currentUser._id
    ));

    if (!open) return null
    return reactDom.createPortal(
        <>
        <div>
            <div className='user-date-show-page date-modal'>
            <button onClick={datesClose} className="modal-close">&times;</button>
                <div className="overflow">
                    <div className='date-index-container date-list'>
                        <h6 id='upcoming-dates'>Upcoming Dates:</h6>
                    </div>
                        {datesList()}
                        {request()}
                        {pending()}
                </div>
            </div>
        </div>
        </>,
        document.getElementById("portal")
    )
};

export default DateShowPage;