import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDate, getDate } from "../../store/dates";


const DateEventContainer = ({dateId}) => {
    const dispatch = useDispatch();
    const date = useSelector(getDate(dateId));

    useEffect(() => {
        dispatch(fetchDate(dateId))
    }, [dispatch]);

    return (
        <div className="date-container">
            
        </div>
    )
};

export default DateEventContainer