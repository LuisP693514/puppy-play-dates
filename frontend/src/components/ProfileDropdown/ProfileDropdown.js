import './ProfileDropdown.css';
import {useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';



const ProfileDropdown = () => {
    const history = useHistory();
    const dispatch = useDispatch();


    const handleChange = (e) => {
        e.preventDefault();
        switch (e.target.value) {
            case 'Profile':
                history.push('/profile');
                break;
            case 'Account Settings':
                history.push('/settings');
                break;
            case 'Messages':
                history.push('/messages');
                break;
            case 'Favorites':
                history.push('/favorites');
                break;
            case 'Logout':
                dispatch(sessionActions.logout());
                history.push('/login')
                // is it still sessionActions for logout
            default:
                break;
        }
    };

  return (
    <select onChange={handleChange}>
        <option key={profile} value={'Profile'}>
            Profile
        </option>
        <option key={settings} value={'Account Settings'}>
            Account Settings
        </option>
        <option key={messages} value={'Messages'}>
            Messages
        </option>
        <option key={favorites} value={'Favorites'}>
            Favorites
        </option>
        <option key={logout} value={'Logout'}>
            Logout
        </option>
    </select>
  ); 

};

export default ProfileDropdown;