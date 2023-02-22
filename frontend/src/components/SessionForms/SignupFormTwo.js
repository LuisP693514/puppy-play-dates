
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { updateUser } from '../../store/users';

const SignupFormTwo = ({user}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [updatedUser, setUpdatedUser] = useState({
        name: null,
        age: null,
        puppyName: null,
        puppyAge: null,
        puppyBreed: null,
        puppyTemperament: null,
        vaccinated: null,
        image: null
    });

    const handleUpdate = () => {
        const updatedFields = {};
        for (const [key, value] of Object.entries(updatedUser)) {
            if (value !== null) {
                updatedFields[key] = value;
            }
        }
        dispatch(updateUser({...user, ...updatedFields}));
        history.push('/main');
    }

    const handleSkip = () => {
        history.push('/main')
    }

    return (
        <form className='current-user-profile'>
            <h1 id='profile-text'>Finish Profile</h1>
            <label>
                Name:
                <input type='text' value={updatedUser.name || ''} onChange={e => setUpdatedUser({...updatedUser, name: e.target.value || null})} />
            </label>
            <label>
                Age:
                <input type='text' value={updatedUser.age || ''} onChange={e => setUpdatedUser({...updatedUser, age: e.target.value || null})} />
            </label>
            <label>
                Puppy Name:
                <input type='text' value={updatedUser.puppyName || ''} onChange={e => setUpdatedUser({...updatedUser, puppyName: e.target.value || null})} />
            </label>
            <label>
                Puppy Age:
                <input type='text' value={updatedUser.puppyAge || ''} onChange={e => setUpdatedUser({...updatedUser, puppyAge: e.target.value || null})} />
            </label>
            <label>
                Puppy Breed:
                <input type='text' value={updatedUser.puppyBreed || ''} onChange={e => setUpdatedUser({...updatedUser, puppyBreed: e.target.value || null})} />
            </label>
            <label>
                Puppy Temperament:
                <input type='text' value={updatedUser.puppyTemperament || ''} onChange={e => setUpdatedUser({...updatedUser, puppyTemperament: e.target.value || null})} />
            </label>
            {/* possibly do a dropdown for preselected list of temperaments */}
            <label>
                Vaccinated:
                <input type='checkbox' checked={updatedUser.vaccinated} onChange={e => setUpdatedUser({...updatedUser, vaccinated: e.target.checked || null})} />
            </label>
            <div className="profile-image">
                <label> Profile Image:
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={e => setUpdatedUser({...updatedUser, image: e.target.files[0] || null})} />
                </label>
            </div>
                <button type='button' onClick={handleUpdate}>Complete Registration</button>
                <button type='button' onClick={handleSkip}>Skip</button>
        </ form>
    )
};

export default SignupFormTwo;