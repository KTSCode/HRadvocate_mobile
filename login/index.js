import React from 'react';
var {StyleSheet, Button, View, Image} = require('react-native');

import ToastBox from '../toastBox/index';
import LoginForm from './loginForm';

const LoginPage = props => {
  const logos = {
    abc: require('../images/abc.jpg'),
    riptide: require('../images/riptide.jpg'),
    cool: require('../images/cool.jpg'),
    brainstem: require('../images/brainstem.png'),
    pfa: require('../images/pfa.png'),
  };
  return (
    <View style={styles.MyForm}>
      <View style={styles.imageContainerStyle}>
        <Image source={logos[props.logo]} style={styles.imageStyle} />
      </View>
      {props.error && (
        <ToastBox
          color="#EE3E4B"
          title="Invalid Login"
          text="Please Try Again"
          icon="error"
        />
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
      <View style={styles.buttonStyle}>
        <Button
          title="<- Change Company Code"
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
    </View>
  );
};

export default LoginPage;

var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  imageContainerStyle: {
    flex: 3,
  },
  imageStyle: {
    marginTop: 50,
    width: 350,
    height: 180,
    resizeMode: 'cover',
  },
  buttonStyle: {
    flex: 2,
    justifyContent: 'flex-end',
  },
});
