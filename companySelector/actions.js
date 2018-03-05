//XXX What is a promise and could I do this without using one?
import thunk from 'redux-thunk'
export const DATA_AVAILABLE = 'DATA_AVAILABLE';


export const fetchCompanies = () => ({ type: 'FETCH_COMPANIES' });
export const setActiveCompany = (code) => ({ type: 'SET_ACTIVE_COMPANY', code });

export const fetchCompaniesSuccess = (data) => ({
  type: 'FETCH_COMPANIES_SUCCESS',
  data
});
