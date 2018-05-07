import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {reduxForm, Field} from 'redux-form';
import CheckBox from 'react-native-checkbox';

const CheckBoxInput = props => {
  const {input, meta, ...inputProps} = props;
  const formStates = [
    'active',
    'autofilled',
    'asyncValidating',
    'dirty',
    'invalid',
    'pristine',
    'submitting',
    'touched',
    'valid',
    'visited',
  ];
  return (
    <View style={props.style}>
      <CheckBox
        {...inputProps}
        labelBefore={true}
        label="Remember Me"
        labelStyle={props.labelStyle}
        onChange={input.onChange}
        value={input.value}
      />
      {formStates.filter(state => meta[state]).map(state => {
        <Text key={state}> - {state}</Text>;
      })}
    </View>
  );
};

const FieldTextInput = props => {
  const {input, meta, ...inputProps} = props;
  const formStates = [
    'active',
    'autofilled',
    'asyncValidating',
    'dirty',
    'invalid',
    'pristine',
    'submitting',
    'touched',
    'valid',
    'visited',
  ];
  return (
    <View>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={styles.inputStyle}
      />
      {formStates.filter(state => meta[state]).map(state => {
        <Text key={state}> - {state}</Text>;
      })}
    </View>
  );
};

const LoginForm = props => {
  return (
    <View style={styles.LoginContainer}>
      <Text style={styles.textStyle}>Username</Text>
      <Field name={'username'} component={FieldTextInput} />
      <Text style={styles.textStyle}>Password</Text>
      <Field name={'password'} component={FieldTextInput} />
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://hra.neudesic.com/')}>
          <Text style={styles.forgotPasswordLabel}>Forgot password?</Text>
        </TouchableOpacity>
        <Field
          name={'remember'}
          component={CheckBoxInput}
          style={styles.checkbox}
          labelStyle={styles.checkboxLabel}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={props.handleSubmit}>
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

var {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
  LoginContainer: {
    height: 280,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    backgroundColor: 'white',
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    alignSelf: 'stretch',
    paddingBottom: height * 0.125,
    paddingTop: height * 0.02,
  },
  inputStyle: {
    height: 35,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    textAlign: 'center',
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: width * 0.045,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonStyle: {
    height: 35,
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 20,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    backgroundColor: '#1E98C7',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontSize: width * 0.045,
    color: 'white',
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.01,
  },
  checkboxLabel: {
    fontSize: width * 0.035,
    color: 'black',
  },
  rememberMeContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordLabel: {
    fontSize: width * 0.035,
    color: '#1E98C7',
  },
});

export default reduxForm({form: 'login'})(LoginForm);
