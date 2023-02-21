import './ProfileDropdown.css';
import {useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';



const ProfileDropdown = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

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
            // case 'Favorites':
            //     history.push('/favorites');
            //     break;
            case 'Logout':
                dispatch(sessionActions.logout());
                history.push('/login');
                break;
                // is it still sessionActions for logout
            case 'Login':
                history.push('/login');
                break;
            default:
                break;
        }
    };

  return (
    <select onChange={handleChange} className='profile-dropdown-menu'>
        <option key={'profile'} value={'Profile'}>
            Profile
        </option>
        <option key={'settings'} value={'Account Settings'}>
            Account Settings
        </option>
        <option key={'messages'} value={'Messages'}>
            Messages
        </option>
        {/* <option key={'favorites'} value={'Favorites'}>
            Favorites
        </option> */}
       {sessionUser ? (
            <option key={"logout"} value={"Logout"}>
                Logout
            </option>) : (
            <option key={"login"} value={"Login"}>
                Login
            </option>
        )}
    </select>
  ); 

};

export default ProfileDropdown;