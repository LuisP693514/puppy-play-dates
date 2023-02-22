import './ProfilePage.css';
import ReactDom from 'react-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../../../store/session';
import {useHistory } from 'react-router-dom';
import { selectCurrentUser } from '../../../store/session';
import { deleteUser, fetchUser, getUser, updateUser } from '../../../store/users';


function ProfilePage({open, profileClose}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectCurrentUser)
    const currentUser = useSelector(getUser(user._id))
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({...currentUser});


    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchUser(user._id))
    }, [dispatch]);

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleUpdate = () => {
        dispatch(updateUser({...currentUser, ...updatedUser}));
        setEditMode(false);
    }

    const handleCancel = () => {
        setUpdatedUser(currentUser);
        setEditMode(false);
    }


    useEffect(() => {
        if (!editMode) {
        dispatch(getCurrentUser());
        }
    }, [dispatch, editMode]);

    if (!user) return null;
    if (!currentUser) return null;

    if(!open) return null
    if (editMode) {
        return ReactDom.createPortal(
            <div className="options-modal">
                <button onClick={profileClose} className="modal-close">&times;</button>
                <form className='current-user-profile'>
                    <h3 id='profile-text'>Edit Profile</h3>
                    <div className="update-div">
                        <label>
                            Name:
                            <input type='text' value={updatedUser.name} onChange={e => setUpdatedUser({...updatedUser, name: e.target.value})} />
                        </label>
                        <label>
                            Age:
                            <input type='text' value={updatedUser.age} onChange={e => setUpdatedUser({...updatedUser, age: e.target.value})} />
                        </label>
                        <label>
                            Puppy Name:
                            <input type='text' value={updatedUser.puppyName} onChange={e => setUpdatedUser({...updatedUser, puppyName: e.target.value})} />
                        </label>
                        <label>
                            Puppy Age:
                            <input type='text' value={updatedUser.puppyAge} onChange={e => setUpdatedUser({...updatedUser, puppyAge: e.target.value})} />
                        </label>
                        <label>
                            Puppy Breed:
                            <input type='text' value={updatedUser.puppyBreed} onChange={e => setUpdatedUser({...updatedUser, puppyBreed: e.target.value})} />
                        </label>
                        <label>
                            Puppy Temperament:
                            <input type='text' value={updatedUser.puppyTemperament} onChange={e => setUpdatedUser({...updatedUser, puppyTemperament: e.target.value})} />
                        </label>
                        <label>
                            Vaccinated:
                            <input type='checkbox' checked={updatedUser.puppyVaccinated} onChange={e => setUpdatedUser({...updatedUser, puppyVaccinated: e.target.checked})} />
                        </label>
                    </div>
                    <div className="profile-image">
                        <label> Profile Image: 
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={e => setUpdatedUser({...updatedUser, image: e.target.files[0]})} />
                        </label>
                    </div>
                    <div className="update-buttons">
                        <button className="button" type='button' onClick={handleUpdate}>Update</button>
                        <button className="button" type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </ form>
            </div>,
            document.getElementById("portal")
        )
    } else {
        return ReactDom.createPortal(
            <div className="options-modal">
                <div className='current-user-profile'>
                    <div className="profile-header">
                        <h3 id='profile-text'>My Profile</h3>
                        <button onClick={profileClose} className="modal-close">&times;</button>
                    </div>
                    <img className="profile-image" src={currentUser.profileImageUrl} alt="profile"/>
                    <div className="profile-puppy-details-section"> 
                        <h3 id="my-puppy-profile-details-text">Name</h3>
                        <div className="my-dog-name-section">
                            <h3 id='my-dog-name'>{currentUser.puppyName}</h3>
                        </div>
                        <div className="my-dog-age-section">
                            <p id="my-dog-age-text">Age: </p>
                            <p id='my-dog-age'>{currentUser.puppyAge}</p>
                        </div>
                        <div className="my-dog-breed-section">
                            <p id="my-dog-breed-text">Breed: </p>
                            <p id='my-dog-breed'>{currentUser.puppyBreed}</p>
                        </div>
                        <div className="my-dog-temperament-section">
                            <p id="my-dog-temperament-text">Temperament: </p>
                            <p id='my-dog-temperament'>{currentUser.puppyTemperament}</p>
                        </div>
                        <div className="my-dog-vacc-section">
                            <p id="my-dog-vacc-text">Vaccinated: </p>
                            <p id='my-dog-vacc'>{currentUser.puppyVaccinated ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    <div className='profile-page-buttons'>
                        <button className='button edit-profile-button' onClick={handleEdit}>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>,
            document.getElementById("portal")
    )}

}; 

export default ProfilePage;