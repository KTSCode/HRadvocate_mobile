const employeeUpdate = ({prop, value}) => {
  return {
    type: 'EMPLOYEE_UPDATE',
    payload: {prop, value},
  };
};

export default employeeUpdate;
