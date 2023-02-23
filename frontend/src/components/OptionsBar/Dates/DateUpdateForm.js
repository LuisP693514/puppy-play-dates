import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateDate } from "../../../store/dates";
    
       
const UpdateDateForm = ({date}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [updatedDate, setUpdatedDate] = useState({...date});


    const handleUpdate = () => {
        dispatch(updateDate({...date, ...updatedDate}));
    }

    const handleCancelUpdate = () => {
        setUpdatedDate(date);
        history.push('/main')
    }

    return (
        <form className="edit-date">
                <p>Edit Your Date with {date.invitee}</p>
                <label>
                    Name:
                    <input type='text' value={updatedDate.name} onChange={e => setUpdatedDate({...updatedDate, name: e.target.value})}/>
                </label>
                <label>
                    Date
                    <input type='text' value={updatedDate.date} onChange={e => setUpdatedDate({...updatedDate, date: e.target.value})}/>
                </label>
                <label>
                    Description:
                    <input type='text' value={updatedDate.description} onChange={e => setUpdatedDate({...updatedDate, description: e.target.value})}/>
                </label>
                <label>
                    Longitude:
                    <input type='number' value={updatedDate.longitude} onChange={e => setUpdatedDate({...updatedDate, longitude: e.target.value})}/>
                </label>
                <label>
                    Latitude:
                    <input type='number' value={updatedDate.latitude} onChange={e => setUpdatedDate({...updatedDate, latitude: e.target.value})}/>
                </label>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancelUpdate}>Cancel</button>
        </form>
        )
};

export default UpdateDateForm;