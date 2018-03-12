import React from 'react';
var {
  StyleSheet,
  ListView,
  Button,
  View,
  Text,
  TextInput,
} = require('react-native');

import {connect} from 'react-redux';

import LoginForm from './loginForm';

class LoginPage extends React.Component {
  state = {};
  render() {
    return (
      <View style={styles.MyForm}>
        <Text> login page </Text>
        <LoginForm
          onSubmit={values => {
            alert('logging in with' + values);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(LoginPage);

var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
