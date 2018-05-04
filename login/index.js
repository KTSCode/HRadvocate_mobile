import React from 'react';
var {StyleSheet, Button, View, Image, Dimensions, Linking, TouchableOpacity, Text} = require('react-native');

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
      {(props.remember.remember && (
        <LoginForm
          initialValues={{
            username: props.remember.username,
            password: props.remember.password,
          }}
          onSubmit={values => {
            props.dispatch({
              type: 'LOGIN',
              username: values.username.toLowerCase(),
              password: values.password,
              remember: values.remember,
              employees: props.data.employees,
            });
          }}
        />
      )) || (
        <LoginForm
          onSubmit={values => {
            props.dispatch({
              type: 'LOGIN',
              username: values.username.toLowerCase(),
              password: values.password,
              remember: values.remember,
              employees: props.data.employees,
            });
          }}
        />
      )}
      <View style={styles.buttonStyle}>
        <TouchableOpacity
          title="<- Change Company Code"
          onPress={() => {
            props.dispatch({type: 'CHANGE_COMPANY'});
          }}>
          <Text>Change Company Code</Text>
        </TouchableOpacity>
        <Button
          title="SKIP"
          onPress={() => {
            props.dispatch({
              type: 'LOGIN',
              username: 'bob@abc.com',
              password: 'secret',
              remember: true,
              employees: props.data.employees,
            });
          }}
        />
      </View>
    </View>
  );
};

export default LoginPage;
var {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  imageContainerStyle: {
    marginLeft: width * 0.125,
    marginRight: width * 0.125,
    flex: 3,
  },
  imageStyle: {
    marginTop: 50,
    width: width * 0.75,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  buttonStyle: {
    flex: 2,
    justifyContent: 'flex-end',
  },

});
