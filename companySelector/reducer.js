import {combineReducers} from 'redux';
import CompaniesData from './companies.json';

const companySelector = (state = {code: '', found: false}, action) => {
  switch (action.type) {
    case 'SUBMIT_CODE':
      const newState = {
        ...state,
        code: action.code,
        found: checkCompany(action.code),
      };
      console.log(newState)
      return newState
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

export default companySelector;
