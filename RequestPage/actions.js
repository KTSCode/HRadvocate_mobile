//action creators that updates user requests and balances respectively
export const requestUpdate = request => {
  return {
    type: 'REQUEST_ADDITION',
    payload: request,
  };
};

export const hoursUpdate = ({prop,value}) => {
  return {
    type: 'NEW_BALANCES',
    payload: {prop,value},
  };
};
