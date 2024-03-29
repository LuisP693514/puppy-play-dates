import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
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
import CreateDate from './components/CreateDateForm/CreateDateForm';
import UpdateDateForm from './components/OptionsBar/Dates/DateUpdateForm';
import TestChat from './components/TestChat';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path='/signup2' component={SignupFormTwo} />
        <ProtectedRoute exact path='/createDate' component={CreateDate} />
        <ProtectedRoute exact path='/editDate' component={UpdateDateForm} />
        <ProtectedRoute exact path="/main" component={MainPage} />
        <ProtectedRoute exact path='/test' component={TestChat} />
        {/* <ProtectedRoute exact path="/users/:id" component={ProfilePage} /> */}
      </Switch>
    </>
  );
}

export default App;