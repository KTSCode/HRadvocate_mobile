import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Reducers from different components
import companySelectorReducers from './companySelector/reducer';

const reducers = {
  companySelectorReducers,
  form: formReducer,
};

const reducer = combineReducers(reducers);
export default createStore(reducer);
