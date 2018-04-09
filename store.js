import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger';

// Reducers from different components
import companySelector from './companySelector/reducer';

const root = (state = {found: false, login: false}, action) => {
  switch (action.type) {
    case 'COMPANY_FOUND':
      return {...state, found: true};
    case 'LOGGED_IN':
      return {...state, login: true};
    default:
      return state;
  }
};

const reducers = {
  root,
  companySelector,
  form: formReducer,
};
const reducer = combineReducers(reducers);

const logger = createLogger({
  predicate: (getState, action) => !RegExp('@@redux-form*').test(action.type),
});

export default createStore(reducer, applyMiddleware(logger));
