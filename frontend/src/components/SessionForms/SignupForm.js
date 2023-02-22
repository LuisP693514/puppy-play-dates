import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import tightlogo from "../../images/tight-logo.jpg"
import { Link } from 'react-router-dom';
import { getLocation } from '../Utils/getLocation';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [password2, setPassword2] = useState('');
  // const [image, setImage] = useState(null);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }
  
  // async function getLocationData() {
  //   debugger
  //   try {
  //     const location = await getLocation();
  //     setLatitude = (location[0])
  //     setLongitude = (location[1])
  //     console.log(location); // this will log the user's latitude and longitude to the console
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  getLocation().then(coords => {
    console.log(coords);
    setLatitude(coords[0])
    setLongitude(coords[1])
  }).catch(error => {
    console.error(error);
  });
  // const currentLocation = getLocation()
  // console.log(currentLocation)

  
  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      // image,
      password,
      latitude,
      longitude
    };
    

    dispatch(signup(user)); 
    history.push('/main', {user});

  }
  
  // const updateFile = e => setImage(e.target.files[0]);
  return (
    <div className="login-form-div signup-div">
      <form className="session-form" onSubmit={handleSubmit}>
        <div className="login-spacer signup-head">
          <h2 className="orange-text signup-head">Sign Up</h2>
          <div className="login-spacer center"><img className="signin-logo" src={tightlogo}/> </div>
        </div>
        <div className="login-spacer">
          <label>
            <span>Email: </span>
            <input type="text"
              className="input-field"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
        <div className="errors">{errors?.email}</div>
        </div>
        <div className="login-spacer">
          <label>
            <span>Username: </span>
            <input type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
            />
          </label>
          <div className="errors">{errors?.username}</div>
        </div>
        <div className="login-spacer">
          <label>
            <span>Password: </span>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <div className="errors">{errors?.password}</div>
        </div>
        <div className="login-spacer">
          <label>
            <span>Confirm Password: </span>
            <input type="password"
              value={password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
            />
          </label>
          <div className="errors">{password !== password2 && 'Confirm Password field must match'}</div>
        </div>
        {/* <div className="login-spacer">
          <label> Profile Image: </label>
          <input type="file" accept=".jpg, .jpeg, .png" onChange={updateFile} />
        </div> */}
        <button
          className="login-button"
          type="submit"
          disabled={!email || !username || !password || password !== password2}
        >Sign Up</button>
        <Link to="/login"><div className="grey-text switch-login">Already have an Account?</div></Link>
      </form>
    </div>
  );
}

export default SignupForm;