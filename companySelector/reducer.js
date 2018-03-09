import { combineReducers } from 'redux';

const companies = (state = [], action) => {
  switch (action.type) {
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

const companyCodeInput = (state = "", action) => {
  switch (action.type) {
    case 'COMPANY_CODE_INPUT':
      return action.text
    default:
      return state;
  }
}
// Combine all the reducers
const rootReducer = combineReducers({
  companies,
  activeCompany,
  companyCodeInput
})

export const getCompany = (state, code) => {
  return state.companies.find((company) => { return company.code == code});
}
export const getActiveCompany = (state) => state.activeCompany

export default rootReducer;
