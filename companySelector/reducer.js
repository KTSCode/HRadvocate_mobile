import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "./actions"

let dataState = { data: {}, company:false };

const companies = (state = [], action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      if (data){
        state = Object.assign({}, state, { data: action.data, company:true });
      }
      return state;
    case 'FETCH_COMPANIES_SUCCESS':
      return action.data.companies
    default:
      return state;
  }
};

const activeCompany = (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_COMPANY':
      return action.code
    default:
      return state;
  }
}
// Combine all the reducers
const rootReducer = combineReducers({
  companies,
  activeCompany
})

export const getCompany = (state, code) => {
  return state.companies.find((company) => {
    return company.code == code;
  });
}

export const getActiveCompany = (state) => state.activeCompany

export default rootReducer;
