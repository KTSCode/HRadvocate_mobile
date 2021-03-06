import CompaniesData from './companies.json';

const company = (
  state = {code: '', found: false, data: '', invalid: false, info: false},
  action,
) => {
  switch (action.type) {
    case 'SUBMIT_CODE': {
      const newState = {
        ...state,
        code: action.code,
        found: checkCompany(action.code),
        data: companyData(action.code),
        invalid: false,
      };
      return newState;
    }
    case 'INVALID_INPUT':
      return {...state, code: '', invalid: true, info: true};
    case 'REQUEST_COMPANY_INFO':
      return {...state, info: true};
    case 'CHANGE_COMPANY':
      return {...state, found: false, code: ''};
    default:
      return state;
  }
};

const checkCompany = code => {
  return CompaniesData.companies.some(elem => {
    return elem.code === code;
  });
};

const companyData = code => {
  var company = CompaniesData.companies.find(elem => {
    return elem.code === code;
  });
  if (company) {
    return company;
  } else {
    return '';
  }
};

export default company;
