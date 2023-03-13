import reactDom from 'react-dom';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createDateRequest } from '../../store/dateRequests';
import './CreateDateForm.css';

const CreateDate = ({open, setShowCreate, currentUser, otherUser}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [date, setDate] = useState('')
  
    const handleSubmit = (e) => {
    e.preventDefault();
    const userOneId = currentUser._id;
    const userTwoId = otherUser._id;
    const dateInfo = {   
        name,
        date,
        description,
        longitude,
        latitude
    };
    dispatch(createDateRequest({senderId: userOneId, receiverId: userTwoId, ...dateInfo}));
    history.push('/main')
  };

  if (!otherUser) return null;
  if (!open) return null

  return reactDom.createPortal(
    <>
        <div className="date-modal-overlay"></div>
        <div className="create-date-modal">
            <button onClick={() => setShowCreate(false)} className="modal-close">&times;</button>
            <div className='create-date-form-container'>
                <div>
                    <h1 id='date-form-title'>Create Play Date with {otherUser.puppyName}Place</h1>
                </div>
                <div>
                    <form className='create-date-form' onSubmit={handleSubmit}>
                        <div>
                            <img className="profile-image date-image" src={otherUser.profileImageUrl}/>
                        </div>
                        <div className='create-form-inputs'>
                            <div>

                                <div id='date-name-section'>
                                    <label id="date-name-text">Date Name:</label>
                                    <input
                                        id="date-name-input"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="date-time-section">
                                    <label id="date-time-text">Date and Time:</label>
                                    <input
                                        type={"date"}
                                        id="date-date-input"
                                        name="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    ></input>
                                </div>
                                <div className="date-description-section">
                                    <label id="date-description-text">Description:</label>
                                    <textarea
                                        id="date-description-input"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <p>Location:</p>
                                <div className="date-location-section">
                                    <label id="date-location-input">Latitude</label>
                                    <input
                                        id="date-location-input"
                                        type="number"
                                        name="latitude"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="date-location-section">
                                    <label id="date-location-input">Longitude</label>
                                    <input
                                        id="date-location-input"
                                        type="number"
                                        name="longitude"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <button id='date-submit' className="button" type="submit">Create Date</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>,
    document.getElementById('portal2')
  )

};

export default CreateDate;