import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import './CreateDateForm.css';
import { createDateRequest } from '../../store/dateRequests';

const CreateDate = ({sessionUser, otherUser}) => {
    const dispatch = useDispatch();
    const history = useHistory
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const userOneId = sessionUser.id;
    const userTwoId = otherUser.id;
    const dateInfo = {
      name,
      description,
      longitude,
      latitude
    };
    dispatch(createDateRequest(userOneId, userTwoId, dateInfo));
    history.push('/dates')
  };

  return (
    <div className='create-date-form-container'>
        <h1 id='date-form-title'>Create a Play Date With {otherUser.puppyName}</h1>
        <form className='create-date-form' onSubmit={handleSubmit}>
            <div id='date-name-section'>
                <label id="date-name-text">Date Name</label>
                <input
                    id="date-name-input"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="date-description-section">
                <label id="date-description-text">Description</label>
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
                    type="text"
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
                    type="text"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                />
            </div>
            <button id='date-submit' type="submit">Create Date</button>
        </form>
    </div>
  )

};

export default CreateDate;