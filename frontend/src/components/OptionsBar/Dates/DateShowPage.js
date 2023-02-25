import { useEffect } from 'react';
import reactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDates, getDates } from '../../../store/dates';
import { getCurrentUser, selectCurrentUser } from '../../../store/session';
import './DateShowPage.css';
import DateEventContainer from './DateEventContainer';
import DateRequestContainer from './DateRequestContainer';
import { fetchDateRequests, getDateRequests } from '../../../store/dateRequests';
import DateRequestInfoContainer from './DateRequestInfoContainer';

const DateShowPage = ({open, datesClose}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const dates = useSelector(getDates);
    const dateRequests = useSelector(getDateRequests);


    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchDates(currentUser._id))
        dispatch(fetchDateRequests(currentUser._id))
    }, [dispatch]);


    if (!dates) return null;
    if (!dateRequests) return null;
    
    const pendingCreator = dateRequests.filter(request => (
        request?.status === 'pending' && request?.creator === currentUser._id
    ));

    const pendingInvitee = dateRequests.filter(request => (
        request?.status === 'pending' && request?.inviteee === currentUser._id
    ));

    // const rejected = dateRequests.filter(request => (
    //     request.status === 'rejected' && request.creator === currentUser._id
    // ));

    if (!open) return null
    return reactDom.createPortal(
        <>
            <div className='user-date-show-page options-modal'>
            <button onClick={datesClose} className="modal-close">&times;</button>
                <div className='date-index-container'>
                    <h1 id='upcoming-dates'>Upcoming Dates</h1>
                    <div id='date-index'>
                        {dates.map(dateId =>{ 
                        return ( <div id='date-item'>
                                        <DateEventContainer dateId={dateId}/>
                                    </div>)}
                        )}
                    </div>
                </div>
                <div className='date-request-index-container'> 
                        <h2 id='date-requests'>Date Requests</h2>
                        <div id='date-request-index'>
                            {pendingInvitee.map(request => {
                                return (<div id='date-item'>
                                            <DateRequestContainer request={request} currentUser={currentUser}/>
                                        </div>)
                            })}
                        </div>
                    </div>
                    <div className='date-pending-index-container'> 
                        <h2 id='date-requests'>Pending Date Requests</h2>
                        <div id='date-request-index'>
                            {pendingCreator.map(request => {
                                return (<div id='date-item'>
                                            <DateRequestInfoContainer request={request}/>
                                        </div>)
                            })}
                        </div>
                    </div>
                    {/* <div className='date-pending-rejected-index-container'> 
                        <h2 id='date-requests'>Rejected Date Requests</h2>
                        <div id='date-request-index'>
                            {rejected.map(request => {
                                return (<div id='date-item'>
                                            <DateRequestInfoContainer request={request}/>
                                        </div>)
                            })}
                        </div>
                    </div> */}
            </div>
        </>,
        document.getElementById("portal")
    )
};

export default DateShowPage;