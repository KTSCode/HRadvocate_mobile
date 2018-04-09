import React from 'react';
var {
  StyleSheet,
  ListView,
  Button,
  View,
  Text,
  TextInput,
  Image,
} = require('react-native');

import {connect} from 'react-redux';

import LoginForm from './loginForm';

const LoginPage = props => {
  const logos = {
    abc: require('../images/abc.jpg'),
    riptide: require('../images/riptide.jpg'),
    cool: require('../images/cool.jpg'),
  };
  return (
    <View style={styles.MyForm}>
      <Image source={logos[props.logo]}
        style={{height: 50, width: 100}}
      />
      <Text> Logo for {props.data.name} </Text>
      <Text> Username: </Text>
      <TextInput style={styles.TextInput} />
      <Text> Password: </Text>
      <TextInput style={styles.TextInput} />
      <Button
        title="login"
        onPress={() => {
          alert('logged in');
        }}
      />
      <Button
        title="change company"
        onPress={() => {
          props.dispatch({type: 'CHANGE_COMPANY'});
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
