import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Reducers from different components
import companySelector from './companySelector/reducer';

const reducers = {
  companySelector,
  form: formReducer,
};

const reducer = combineReducers(reducers);
export default createStore(reducer);
