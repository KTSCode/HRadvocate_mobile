//XXX unfortunatly because we are loading all the data in through one file companies.json
// I had to some of the actions that should be here over to /login/reducer.js

const timeclock = (
  state = {
    clocked: false,
    clock_in_button: true,
    failed: false,
    message: '',
    countdown: 0,
    punches: [],
  },
  action,
) => {
  switch (action.type) {
    case 'SET_COUNTDOWN': {
      //XXX this is only for demo purposes
      //console.log(action.time);
      return {
        ...state,
        countdown: action.time,
      };
    }
    case 'CLOCK_IN_ENABLED':
      return {
        ...state,
        clock_in_button: true,
        countdown: action.time,
      };
    case 'CLOCK_IN_DISABLED':
      return {
        ...state,
        clock_in_button: false,
        countdown: action.time,
      };
    case 'CLOCK_IN': {
      console.log(action.time);
      return {
        ...state,
        clocked: true,
        countdown: 0,
      };
    }
    case 'CLOCK_OUT': {
      console.log(action.date);
      return {
        ...state,
        clocked: false,
        clock_in_button: true,
        countdown: 0,
      };
    }
    default:
      return state;
  }
};

export default timeclock;
