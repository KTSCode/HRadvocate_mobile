import {combineReducers} from 'redux';
import CompaniesData from './companies.json';

const companySelector = (state = {code: '', found: false, name: ''}, action) => {
  switch (action.type) {
    case 'SUBMIT_CODE':
      const newState = {
        ...state,
        code: action.code,
        found: checkCompany(action.code),
        name: companyName(action.code),
      };
      console.log(newState)
      return newState
    case 'CHANGE_COMPANY':
      return {...state, found: false, code: ''};
    default:
      return state;
  }
};

//// Combine all the reducers
//const rootReducer = combineReducers({
//  companySelector,
//});

const checkCompany = code => {
  return CompaniesData.companies.some(elem => {
    return elem.code === code;
  });
};

const companyName = code => {
  return CompaniesData.companies.find(elem => {
    return elem.code === code;
  }).name;
};

export default companySelector;
