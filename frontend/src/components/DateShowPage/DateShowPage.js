import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getDates } from '../../store/dates';
import { getCurrentUser, selectCurrentUser } from '../../store/session';
import { fetchUser, getUser } from '../../store/users';
import './DateShowPage.css';

const DateShowPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const user = useSelector(getUser(currentUser.id))

    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchUser(currentUser.id))
    }, [dispatch]);


    if(!user) return null;

    return (
        <div className='user-date-show-page'>
            <div className='date-index-container'>
                <h1 id='upcoming-dates'>Upcoming Dates</h1>
                <div id='date-index'>
                    {/* {user.dates.map(dateId => 
                        <div id='date-item'>
                            <DateEventContainer dateId={dateId}/>
                        </div>
                    )} */}
                </div>
            </div>
            <div className='date-request-index-container'>
                <h2 id='date-requests'>Date Requests</h2>
                <div id='date-request-index'>
                    {/* {user.dateRequests.map(requestId => 
                        <div id='date-item'>
                            <DateRequestContainer requestId={requestId}/>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
};

export default DateShowPage;