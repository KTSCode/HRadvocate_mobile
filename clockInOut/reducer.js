//XXX unfortunatly because we are loading all the data in through one file companies.json
// I had to some of the actions that should be here over to /login/reducer.js

const timeclock = (
  state = {
    clocked: false,
    clock_in_button: true,
    failed: false,
    message: '',
    countdown: 0,
    punches: {
      'Thurs May 30, 2018': [
        {
          clockIn: 'Thurs May 30 2018 06:31:26 GMT-0700 (PDT)',
          clockOut: 'Thurs May 30 2018 14:35:32 GMT-0700 (PDT)',
        },
      ],
      'Fri Jun 01, 2018': [
        {
          clockIn: 'Fri Jun 01 2018 06:05:26 GMT-0700 (PDT)',
          clockOut: 'Fri Jun 01 2018 14:38:32 GMT-0700 (PDT)',
        },
      ],
      'Sat Jun 02, 2018': [
        {
          clockIn: 'Sat Jun 02 2018 06:35:26 GMT-0700 (PDT)',
          clockOut: 'Sat Jun 02 2018 10:15:32 GMT-0700 (PDT)',
        },
        {
          clockIn: 'Sat Jun 02 2018 16:25:21 GMT-0700 (PDT)',
          clockOut: 'Sat Jun 02 2018 19:45:23 GMT-0700 (PDT)',
        },
      ],
    },
  },
  action,
) => {
  switch (action.type) {
    case 'SET_COUNTDOWN': {
      //XXX this is only for demo purposes
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
      const dateTime = new Date(action.time).toString();
      const d = dateTime.split(' ');
      const dateString = d[0] + ' ' + d[1] + ' ' + d[2] + ', ' + d[3];
      if (!state.punches[dateString]) {
        state.punches[dateString] = [];
      }
      state.punches[dateString].unshift({clockIn: dateTime});
      return {
        ...state,
        clocked: true,
        countdown: 0,
      };
    }
    case 'CLOCK_OUT': {
      const dateTime = new Date(action.time).toString();
      const d = dateTime.split(' ');
      const dateString = d[0] + ' ' + d[1] + ' ' + d[2] + ', ' + d[3];
      state.punches[dateString][0].clockOut = dateTime;
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
