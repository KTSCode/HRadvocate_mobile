import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger';

// Reducers from different components
import company from './companySelector/reducer';
import employee from './login/reducer';
import calendar from './calendar/reducer';

const reducers = {
  company,
  employee,
  calendar,
  form: formReducer,
};
const reducer = combineReducers(reducers);

const logger = createLogger({
  predicate: (getState, action) => !RegExp('@@redux-form*').test(action.type),
});

export default createStore(reducer, applyMiddleware(logger));
