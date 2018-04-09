import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger';

// Reducers from different components
import company from './companySelector/reducer';
import employee from './login/reducer';

const reducers = {
  company,
  employee,
  form: formReducer,
};
const reducer = combineReducers(reducers);

const logger = createLogger({
  predicate: (getState, action) => !RegExp('@@redux-form*').test(action.type),
});

export default createStore(reducer, applyMiddleware(logger));
