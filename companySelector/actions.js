//XXX What is a promise and could I do this without using one?
import thunk from 'redux-thunk'
export const DATA_AVAILABLE = 'DATA_AVAILABLE';

//Import the sample data
import Data from './companies.json';

//FIXME Why do I have to do this??
const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

export const getCompanyData = (code) => {
  return (dispatch) => {
    var data = Data.companies.filter((company) => {
      return company.code == code;
    });
    return delay(2000).then(() => {
      console.log(data)
      dispatch({type: DATA_AVAILABLE, data:data})
    });
  }
}
