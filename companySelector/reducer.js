import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { data: [], company:false };

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      if (action.data.length > 0){
        state = Object.assign({}, state, { data: action.data, company:true });
      }
      return state;
    default:
      return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;
