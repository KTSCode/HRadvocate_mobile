import React from 'react';
var {
  StyleSheet,
  Button,
  View,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  Text,
} = require('react-native');
import ToastBox from '../toastBox/index';
import LoginForm from './loginForm';

const LoginPage = props => {
  //XXX DELETE THIS
  props.dispatch({
    type: 'LOGIN',
    username: 'bob@abc.com',
    password: 'secret',
    remember: true,
    employees: props.data.employees,
  });
  const logos = {
    abc: require('../images/abc.jpg'),
    riptide: require('../images/riptide.jpg'),
    cool: require('../images/cool.jpg'),
    brainstem: require('../images/brainstem.png'),
    pfa: require('../images/pfa.png'),
  };
  return (
    <View style={styles.MyForm}>
      <View style={styles.imageForm}>
        <View style={styles.imageContainerStyle}>
          <Image source={logos[props.logo]} style={styles.imageStyle} />
        </View>
        {props.error && (
          <View style={styles.ErrorToastBox}>
            <ToastBox
              color="#EE3E4B"
              title="Invalid Login"
              text="Please Try Again"
              icon="error"
            />
          </View>
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
            initialValues={{
              username: '',
              password: '',
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
        )}
      </View>
      <View style={styles.buttonStyle}>
        <TouchableOpacity
          style={styles.changeCompanyCodeLabel}
          title="<- Change Company Code"
          onPress={() => {
            props.dispatch({type: 'CLEAR_LOGIN_ERROR'});
            props.dispatch({type: 'CHANGE_COMPANY'});
          }}>
          <Text style={styles.changeCompanyCodeText}>
            {'<- Change Company Code'}
          </Text>
        </TouchableOpacity>
        {__DEV__ && (
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
        )}
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
  imageForm: {
    justifyContent: 'center',
  },
  imageContainerStyle: {
    marginLeft: width * 0.125,
    marginRight: width * 0.125,
  },
  imageStyle: {
    width: width * 0.75,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  buttonStyle: {
    margin: height * 0.01,
    justifyContent: 'flex-end',
  },

  changeCompanyCodeLabel: {
    marginLeft: 20,
  },

  changeCompanyCodeText: {
    color: '#1E98C7',
  },

  ErrorToastBox: {
    alignSelf: 'stretch',
    // paddingLeft: width * 0.08,
    // paddingRight: width * 0.08,
    marginLeft: width * 0.075,
    marginRight: width * 0.075,
  },
});
