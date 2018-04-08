import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger';

// Reducers from different components
import companySelector from './companySelector/reducer';

const reducers = {
  companySelector,
  form: formReducer,
};
const reducer = combineReducers(reducers);

const logger = createLogger({
  predicate: (getState, action) => !RegExp('@@redux-form*').test(action.type),
});

export default createStore(reducer, applyMiddleware(logger));
