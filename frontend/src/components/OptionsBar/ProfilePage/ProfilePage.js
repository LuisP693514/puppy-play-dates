import reactDom from 'react-dom';
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../../../store/session';
import { useHistory } from 'react-router-dom';
import { selectCurrentUser } from '../../../store/session';
import { deleteUser, fetchUser, getUser, updateUser, updateUserImage } from '../../../store/users';
import './ProfilePage.css';


function ProfilePage({ open, profileClose }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectCurrentUser)
    const currentUser = useSelector(getUser(user._id))
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ ...currentUser });
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
      
        const reader = new FileReader();
        const file = e.target.files[0];
        setImage(file)

        reader.onloadend = () => {
            updatedUser.image = file;
            setUpdatedUser(updatedUser);
            setImagePreviewUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchUser(user._id))
    }, [dispatch]);

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleUpdate = () => {
            dispatch(updateUserImage( {...updatedUser} ))
            dispatch(updateUser({ ...currentUser, ...updatedUser }));

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

    if (!open) return null
    if (editMode) {
        return reactDom.createPortal(
            <>
            <div className="my-update-modal">
            <button onClick={profileClose} className="modal-close">&times;</button>
                <div className="edit-div">
                    <form className='current-user-profile'>
                        <h2 className='profile-text'>Edit Profile</h2>
                        <div className="update-div">
                        <div className="update-categories">
                            <div className="profile-image">
                                <div>
                                    <label> Profile Image: 
                                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                                    </label >
                                </div>
                                <div>
                                    {imagePreviewUrl && (
                                        <img className="preview-image" src={imagePreviewUrl} alt="Profile Preview" />
                                    )}
                                </div>
                            </div>
                            <div className="label-div">
                                <label>Name: <input type='text' value={updatedUser.name} onChange={e => setUpdatedUser({ ...updatedUser, name: e.target.value })} /></label>
                                <label>Age: <input type='text' value={updatedUser.age} onChange={e => setUpdatedUser({ ...updatedUser, age: e.target.value })} /></label>
                                <label>Puppy Name: <input type='text' value={updatedUser.puppyName} onChange={e => setUpdatedUser({ ...updatedUser, puppyName: e.target.value })} /></label>
                                <label>Puppy Age: <input type='text' value={updatedUser.puppyAge} onChange={e => setUpdatedUser({ ...updatedUser, puppyAge: e.target.value })} /></label>
                                <label>Puppy Breed: <input type='text' value={updatedUser.puppyBreed} onChange={e => setUpdatedUser({ ...updatedUser, puppyBreed: e.target.value })} /></label>
                                <label>Puppy Temperament: <input type='text' value={updatedUser.puppyTemperament} onChange={e => setUpdatedUser({ ...updatedUser, puppyTemperament: e.target.value })} /></label>
                                <label>Vaccinated: <input id="checkbox" type='checkbox' checked={updatedUser.puppyVaccinated} onChange={e => setUpdatedUser({ ...updatedUser, puppyVaccinated: e.target.checked })} /> Yes</label>
                            </div>
                        </div>
                            <div className="update-buttons-div">
                                <div className="update-buttons">
                                    <button className="button grey-button update-button" type='button' onClick={handleCancel}>Cancel</button>
                                    <button className="button update-button" type='button' onClick={handleUpdate}>Update</button>
                                </div>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
            </>,
            document.getElementById("portal")
        )
    } else {
        return reactDom.createPortal(
            <div className="my-profile-modal">
                <div className='current-user-profile'>
                    <div className="profile-header">
                        <h2 className='profile-text'>My Profile</h2>
                        <button onClick={profileClose} className="modal-close">&times;</button>
                    </div>
                    <div className="profile-image-div">
                        <img className="profile-image" src={currentUser.profileImageUrl} alt="profile" />
                    </div>
                    <div className="profile-puppy-details-section">
                        <div className="my-details-text">
                            <span>Name:</span>
                            <span id='my-dog-name'>{currentUser.puppyName}</span>
                        </div>
                        </div>
                        <div className="my-dog-age-section">
                            <span id="my-dog-age-text">Age: </span>
                            <span id='my-dog-age'>{currentUser.puppyAge}</span>
                        </div>
                        <div className="my-dog-breed-section">
                            <span id="my-dog-breed-text">Breed: </span>
                            <span id='my-dog-breed'>{currentUser.puppyBreed}</span>
                        </div>
                        <div className="my-dog-temperament-section">
                            <span id="my-dog-temperament-text">Temperament: </span>
                            <span id='my-dog-temperament'>{currentUser.puppyTemperament}</span>
                        </div>
                        <div className="my-dog-vacc-section">
                            <span id="my-dog-vacc-text">Vaccinated: </span>
                            <span id='my-dog-vacc'>{currentUser.puppyVaccinated ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                    <div className='profile-page-buttons'>
                        <button className='button edit-profile-button' onClick={handleEdit}>
                            Edit Profile
                        </button>
                    </div>
            </div>,
            document.getElementById("portal")
        )
    }

};

export default ProfilePage;