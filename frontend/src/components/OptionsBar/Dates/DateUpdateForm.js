import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDate } from "../../../store/dates";
    
       
const UpdateDateForm = ({date, otherUser}) => {
    const dispatch = useDispatch();

    const [updatedDate, setUpdatedDate] = useState({...date});


    const handleUpdate = () => {
        debugger
        dispatch(updateDate({...date, ...updatedDate}));
    }

    return (
        <form className="edit-date">
                <p>Edit Your Date with {otherUser.name}</p>
                <label>
                    Name:
                    <input type='text' defaultValue={updatedDate.name} onChange={e => setUpdatedDate({...updatedDate, name: e.target.value})}/>
                </label>
                <label>
                    Date
                    <input  type={"date"} defaultValue={updatedDate.date} onChange={e => setUpdatedDate({...updatedDate, date: e.target.value})}/>
                </label>
                <label>
                    Description:
                    <input type='text' defaultValue={updatedDate.description} onChange={e => setUpdatedDate({...updatedDate, description: e.target.value})}/>
                </label>
                {/* <label>
                    Longitude:
                    <input type='number' value={updatedDate.longitude} onChange={e => setUpdatedDate({...updatedDate, longitude: e.target.value})}/>
                </label>
                <label>
                    Latitude:
                    <input type='number' value={updatedDate.latitude} onChange={e => setUpdatedDate({...updatedDate, latitude: e.target.value})}/>
                </label> */}
            <button onClick={handleUpdate}>Update</button>
            {/* <button onClick={handleCancelUpdate}>Cancel</button> */}
        </form>
        )
};

export default UpdateDateForm;