import './ProfilePage.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from './store/session';
import {useHistory } from 'react-router-dom';
import { selectCurrentUser } from '../../store/session';
import { deleteUser, updateUser } from '../../store/users';


function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(selectCurrentUser)
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(currentUser);


    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch]);

    // const handleEdit = e => {
    //     e.preventDefault();
    //     history.push('/editProfile')
    // }

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleUpdate = () => {
        dispatch(updateUser(updatedUser));
        setEditMode(false);
    }

    const handleCancel = () => {
        setUpdatedUser(currentUser);
        setEditMode(false);
    }

    const handleDeleteClick = e => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleConfirmDelete = e => {
        e.preventDefault();
        dispatch(deleteUser(currentUser.id));
        history.push('/login');
    }

    const handleCancelDelete = e => {
        e.preventDefault();
        setShowModal(false);
    }


    if (editMode) {
        return (
            <form className='current-user-profile'>
                <h1 id='profile-text'>Edit Profile</h1>
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
                {/* possibly do a dropdown for preselected list of temperaments */}
                <label>
                    Vaccinated:
                    <input type='checkbox' checked={updatedUser.vaccinated} onChange={e => setUpdatedUser({...updatedUser, vaccinated: e.target.checked})} />
                </label>
                <button type='button' onClick={handleUpdate}>Update</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </ form>
        )
    } else {
        return (
            <div className='current-user-profile'>
                <h1 id='profile-text'>My Profile Page</h1>
                <img className="profile-image" src={currentUser.profileImageUrl} alt="profile"/>
                <div className="profile-puppy-details-section"> 
                    <h1 id="my-puppy-profile-details-text">Puppy Profile</h1>
                    <div className="my-dog-name-section">
                        <h2 id="my-dog-name-text">Name: </h2>
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
                        <p id='my-dog-vacc'>{currentUser.puppyVaccinated}</p>
                    </div>
                </div>
                <div className="my-owner-profile-details-section">
                    <h4 id="my-owner-profile-text">Owner's Profile</h4>
                    <div className="my-profile-owner-name-section">
                        <h5 id="my-profile-owner-name-text">Name: </h5>
                        <h6 id='my-profile-owner-name'>{currentUser.name}</h6>
                    </div>
                    <div className="my-profile-owner-age-section">
                        <h2 id="my-profileowner-age-text">Age: </h2>
                        <h3 id='my-profile-owner-age'>{currentUser.age}</h3>
                    </div>   
                </div>
                <div className='profile-page-buttons'>
                    <button className='edit-profile-button' onClick={handleEdit}>
                        Edit Profile
                    </button>
                    <button className='delete-profile-button' onClick={handleDeleteClick}>
                        Delete Profile
                    </button>
                </div>
                {showModal && (
                    <div className='delete-modal'>
                        <h2>Are you sure you want to delete your profile?</h2>
                        <div className='modal-buttons'>
                            <button className='yes-button' onClick={handleConfirmDelete}>
                                Yes
                            </button>
                            <button className='no-button' onClick={handleCancelDelete}>
                                No
                            </button>
                        </div>
                    </div>
                )}
            </div>

    )}

}; 

export default ProfilePage;