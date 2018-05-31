const employee = (
  state = {
    loggedIn: false,
    failed: false,
    message: '',
    remember: false,
    username: '',
    password: '',
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case 'LOGIN': {
      const attempt = loginAttempt(
        action.username,
        action.password,
        action.employees,
      );
      const newState = {
        ...state,
        loggedIn: attempt.success,
        failed: !attempt.success,
        message: attempt.message,
        remember: action.remember,
        username: action.username,
        password: action.password,
        data: attempt.data,
      };
      return newState;
    }
    case 'LOGOUT':
      return {
        loggedIn: false,
        failed: false,
        message: 'Logged Out',
        remember: state.remember,
        username: state.username,
        password: state.password,
      };
    case 'CLEAR_LOGIN_ERROR':
      return {
        ...state,
        failed: false,
      };
    case 'EMPLOYEE_UPDATE':
      return {
        ...state,
        data: {...state.data, [action.payload.prop]: action.payload.value},
      };
    default:
      return state;
  }
};

const loginAttempt = (username, password, employees) => {
  var employee = employees.find(elem => {
    return elem.email == username && elem.password == password;
  });
  if (employee) {
    return {success: true, message: 'login succeeded', data: employee};
  } else {
    return {success: false, message: 'login attempt failed', data: ''};
  }
};

export default employee;
