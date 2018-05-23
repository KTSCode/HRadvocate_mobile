//XXX unfortunatly because we are loading all the data in through one file companies.json
// I had to some of the actions that should be here over to /login/reducer.js

const timeclock = (
  state = {
    clocked: false,
    failed: false,
    message: '',
    countdown: 0,
  },
  action,
) => {
  switch (action.type) {
    case 'SET_COUNTDOWN': {
      //XXX this is only for demo purposes
      return {
        ...state,
        coundown: action.time,
      };
    }
    case 'CLOCK_IN':
      return {
        ...state,
        clocked: true,
      };
    case 'CLOCK_OUT':
      return {
        ...state,
        clocked: false,
      };
    default:
      return state;
  }
};

export default timeclock;
