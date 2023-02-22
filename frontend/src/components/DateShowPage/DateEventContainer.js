import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDate, getDate } from "../../store/dates";
import { fetchUser, getUser } from "../../store/users";


const DateEventContainer = ({dateId}) => {
    const dispatch = useDispatch();
    const date = useSelector(getDate(dateId));
    const otherUser =useSelector(getUser(date.invitee))

    useEffect(() => {
        dispatch(fetchDate(dateId))
        dispatch(fetchUser(date.invitee))
    }, [dispatch]);

    if (!date) return null;

    return (
        <div className="date-container">
        <p>Date with {otherUser.puppyName}</p>
            <div>{date.name}</div>
            <div>{date.date}</div>
            {/* <div>{date.location}</div> dates location*/}
            <div>{date.description}</div>
        </div>
    )
};

export default DateEventContainer