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


    const datesList = () => {
        if (dates.length){
            return (
                <>
                <div id='date-index'>
                    {dates.map(date =>{ 
                    return ( <div id='date-item'>
                                    <DateEventContainer dateId={date._id}/>
                                </div>)}
                    )}
                </div>
                </>
            )

        } else {
            return (
                <div> To start making dates, Add Friends!</div>
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
                                        <DateRequestContainer request={request} currentUser={currentUser}/>
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
                                        <DateRequestInfoContainer request={request}/>
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
                <div className='date-index-container date-list'>
                    <h6 id='upcoming-dates'>Upcoming Dates:</h6>
                </div>
                    {datesList()}
                    {request()}
                    {pending()}
            </div>
        </div>
        </>,
        document.getElementById("portal")
    )
};

export default DateShowPage;