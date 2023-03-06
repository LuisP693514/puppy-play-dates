import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './SessionForm.css';
import * as sessionActions from '../../store/session';
import { login, clearSessionErrors } from '../../store/session';
import tightlogo from "../../images/tight-logo.jpg"

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  const handleDemoSubmit = () => {
    setEmail('demo-user@appacademy.io')
    setPassword('password')
    dispatch(sessionActions.login({ 
      email: 'demo-user@appacademy.io', 
      password: 'password' }
  ))};

  return (
    <div className="login-form-div">
      <div className="login-spacer center"><img className="login-logo" src={tightlogo}/> </div>

      <form className="session-form" onSubmit={handleSubmit}>
        <div className="gradient"></div>
        <div className="login-spacer center orange-text"><h2>Login</h2></div>
        <div className="login-spacer">
          <label>
            <span className="grey-text"><i className="fa-solid fa-user"></i> </span>
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
            <span className="grey-text"><i className="fa-solid fa-lock"></i> </span>
            <input type="password"
              className="input-field"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          <div className="errors">{errors?.password}</div>
          </label>
        </div>
        <button
          type="submit"
          className="button"
          // disabled={!email || !password}
        >Log In</button>
        <button
          className="button"
          onClick={(e) => handleDemoSubmit()}
        >Demo User</button>
        <Link to='/signup'><div className="grey-text sign-up">Sign up for an Account</div></Link>
      </form>
    </div>
  );
}

export default LoginForm;