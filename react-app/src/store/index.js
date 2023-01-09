import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import answerReducer from './answer';
import followReducer from './follow';
import profileReducer from './profile';
import questionReducer from './question';
import session from './session'
import topicReducer from './topic';

const rootReducer = combineReducers({
  session,
  question: questionReducer,
  answer: answerReducer,
  topic: topicReducer,
  profile: profileReducer,
  follow: followReducer
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
