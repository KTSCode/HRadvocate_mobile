//action creater that is used by form fields
//to update the values in redux
export const employeeUpdate = ({prop, value}) => {
  return {
    type: 'EMPLOYEE_UPDATE',
    payload: {prop, value},
  };
};
