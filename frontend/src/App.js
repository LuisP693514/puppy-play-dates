import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import MyGoogleMap from './components/Map/Map'

import { getCurrentUser } from './store/session';
// import Navbar from './components/NavBar/NavBar';
import ProfilePage from './components/OptionsBar/ProfilePage/ProfilePage';
import LandingPage from './components/LandingPage/LandingPage';
import SignupFormTwo from './components/SessionForms/SignupFormTwo';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Switch>
        <AuthRoute exact path="/" component={LandingPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path='/signup2' component={SignupFormTwo}/> 
        <ProtectedRoute exact path="/main" component={MainPage} />
        {/* <ProtectedRoute exact path="/users/:id" component={ProfilePage} /> */}
      </Switch>
    </>
  );
}

export default App;