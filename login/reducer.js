const employee = (
  state = {
    loggedIn: false,
    failed: false,
    message: '',
    remember: false,
    username: '',
    password: '',
    salutation: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    nickname: '',
    previousName: '',
    phone: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    ssn: '',
    dateOfBirth: '',
    maritalStatus: '',
    email: '',
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
      if (attempt.data) {
        const newState = {
          ...state,
          loggedIn: attempt.success,
          failed: !attempt.success,
          message: attempt.message,
          remember: action.remember,
          username: action.username,
          password: action.password,
          salutation: attempt.data.salutation,
          firstName: attempt.data.firstName,
          middleName: attempt.data.middleName,
          lastName: attempt.data.lastName,
          suffix: attempt.data.suffix,
          nickname: attempt.data.nickname,
          previousName: attempt.data.previousName,
          phone: attempt.data.phone,
          street1: attempt.data.street1,
          street2: attempt.data.street2,
          city: attempt.data.city,
          state: attempt.data.state,
          postalCode: attempt.data.postalCode,
          country: attempt.data.country,
          ssn: attempt.data.ssn,
          dateOfBirth: attempt.data.dateOfBirth,
          maritalStatus: attempt.data.maritalStatus,
          email: attempt.data.email,
          data: attempt.data,
        };
        return newState;
      } else {
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
    case 'UPDATE_INFO':
      return {
        ...state,
        data: action.payload,
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
