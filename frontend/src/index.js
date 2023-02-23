import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import { ModalProvider } from './context/Modal';
import * as userActions from './store/users'
import jwtFetch from './store/jwt';
import * as sessionActions from './store/session'
import * as dateRequestActions from './store/dateRequests'

const store = configureStore({});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.jwtFetch = jwtFetch;
  window.userActions = userActions;
  window.sessionActions = sessionActions;
  window.dateRequestActions = dateRequestActions;
}


function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);