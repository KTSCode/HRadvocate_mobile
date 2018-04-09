import React from 'react';
var {StyleSheet, Button, View, Text, Image} = require('react-native');

import LoginForm from './loginForm';

const LoginPage = props => {
  const logos = {
    abc: require('../images/abc.jpg'),
    riptide: require('../images/riptide.jpg'),
    cool: require('../images/cool.jpg'),
  };
  return (
    <View style={styles.MyForm}>
      <Image source={logos[props.logo]} style={{height: 50, width: 100}} />
      <Text> Logo for {props.data.name} </Text>
      {props.error && (
        <Text style={{color: 'red'}}> {props.errorMessage} </Text>
      )}
      <LoginForm
        onSubmit={values => {
          props.dispatch({
            type: 'LOGIN',
            username: values.username.toLowerCase(),
            password: values.password,
            employees: props.data.employees,
          });
        }}
      />
      <Button
        title="change company"
        onPress={() => {
          props.dispatch({type: 'CHANGE_COMPANY'});
        }}
      />
      <Button
        title="SKIP"
        onPress={() => {
          props.dispatch({
            type: 'LOGIN',
            username: 'bob@abc.com',
            password: 'secret',
            employees: props.data.employees,
          });
        }}
      />
    </View>
  );
};

export default LoginPage;

var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
