import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDates, getDates } from '../../store/dates';
import { getCurrentUser, selectCurrentUser } from '../../store/session';
import './DateShowPage.css';
import DateEventContainer from './DateEventContainer';
import DateRequestContainer from './DateRequestContainer';
import { fetchDateRequests, getDateRequests } from '../../store/dateRequests';

const DateShowPage = () => {
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
    

    return (
        <div className='user-date-show-page'>
            <div className='date-index-container'>
                <h1 id='upcoming-dates'>Upcoming Dates</h1>
                <div id='date-index'>
                    {dates.map(dateId => 
                        <div id='date-item'>
                            <DateEventContainer dateId={dateId}/>
                        </div>
                    )}
                </div>
            </div>
            <div className='date-request-index-container'>
                {/* should only be date requests sent to user */}
                <h2 id='date-requests'>Date Requests</h2>
                <div id='date-request-index'>
                    {dateRequests.map(requestId => 
                        <div id='date-item'>
                            <DateRequestContainer requestId={requestId}/>
                        </div>
                    )}
                </div>
            </div>
            {/* section for all pending requests this user sent */}
            {/* section for all rejected requests of this user */}
        </div>
    )
};

export default DateShowPage;