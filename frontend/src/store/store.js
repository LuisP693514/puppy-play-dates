import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors';
import usersReducer from './users';
import dateReducer from './dates';
import dateRequestReducer from './dateRequests';
import markersReducer from './markers';
import friendsReducer from './friends';
import friendRequestReducer from './friendRequests';
import chatRoomsReducer from './chatRooms';
import chatMessagesReducer from './chatMessages';

const rootReducer = combineReducers({
  session,
  errors,
  users: usersReducer,
  dates: dateReducer,
  dateRequests: dateRequestReducer,
  markers: markersReducer,
  friends: friendsReducer,
  friendRequests: friendRequestReducer,
  chatRoom: chatRoomsReducer,
  chatMessages: chatMessagesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;