import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDate } from "../../../store/dates";
    
       
const UpdateDateForm = ({date, otherUser}) => {
    const dispatch = useDispatch();

    const [updatedDate, setUpdatedDate] = useState({...date});


    const handleUpdate = () => {
        dispatch(updateDate({...date, ...updatedDate}));
    }

    return (
        <div className="create-date-form-container">
            <h1>Edit Date with {otherUser.name}</h1>
            <div>
                <form className="create-date-form">
                    <div>
                        <img className="profile-image date-image"src={otherUser.profileImageUrl}/>
                    </div>
                    <div className="update-form">
                        <div >
                            <div className="spacer">
                                <label>
                                    Name:
                                    <input type='text' defaultValue={updatedDate.name} onChange={e => setUpdatedDate({...updatedDate, name: e.target.value})}/>
                                </label>
                            </div>
                            <div className="spacer">
                                <label>
                                    Date
                                    <input type={"date"} defaultValue={updatedDate.date} onChange={e => setUpdatedDate({...updatedDate, date: e.target.value})}/>
                                </label>
                            </div>
                            <div className="spacer">
                                <label>
                                    Description:
                                    <input type='text' defaultValue={updatedDate.description} onChange={e => setUpdatedDate({...updatedDate, description: e.target.value})}/>
                                </label>
                            </div>
                            {/* <label>
                                Longitude:
                                <input type='number' value={updatedDate.longitude} onChange={e => setUpdatedDate({...updatedDate, longitude: e.target.value})}/>
                            </label>
                            <label>
                                Latitude:
                                <input type='number' value={updatedDate.latitude} onChange={e => setUpdatedDate({...updatedDate, latitude: e.target.value})}/>
                            </label> */}
                        </div>
                        <div>
                        <button className="button" onClick={handleUpdate}>Update</button>
                        {/* <button onClick={handleCancelUpdate}>Cancel</button> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
};

export default UpdateDateForm;