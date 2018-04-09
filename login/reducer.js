const employee = (
  state = {loggedIn: false, failed: false, message: ''},
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
        data: attempt.data,
      };
      return newState;
    }
    case 'LOGOUT':
      return {loggedIn: false, failed: false, message: 'Logged Out'};
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
