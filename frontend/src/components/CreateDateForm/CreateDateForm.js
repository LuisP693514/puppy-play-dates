import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import './CreateDateForm.css';
import { createDateRequest } from '../../store/dateRequests';

const CreateDate = ({sessionUser, otherUser}) => {
    const dispatch = useDispatch();
    const history = useHistory
    const [dateName, setDateName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    // time?
    // need to edit create date functionality

    //   const isLoading = useSelector(isCreatingDate);
    //   const error = useSelector(getCreateDateError);
    //const date = useSelector(getCreatedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userOneId = sessionUser.id;
    const userTwoId = otherUser.id;
    const dateInfo = {
      dateName,
      description,
      location,
    };
    dispatch(createDateRequest(userOneId, userTwoId, dateInfo));
    history.push('/dates')
  };

    // if (date) {history.push(`/dates/${date.id}`)};
    // maybe redirect to date index since have to wait for acceptance

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
                    value={dateName}
                    onChange={(e) => setDateName(e.target.value)}
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
            <div className="date-location-section">
                <label id="date-location-input">Location</label>
                <input
                    id="date-location-input"
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    // location might not be a string
                />
            </div>
            {/* {isLoading && <p id='loading-date'>Creating date...</p>}
            {error && <p id='date-error'>Error creating date: {error}</p>} */}
            <button id='date-submit' type="submit">Create Date</button>
        </form>
    </div>
  )

};

export default CreateDate;