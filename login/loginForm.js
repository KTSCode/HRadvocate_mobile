import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
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
      <Field
        name={'username'}
        component={FieldTextInput}
        onFocus={props.onFocus}
      />
      <Text style={styles.textStyle}>Password</Text>
      <Field name={'password'} component={FieldTextInput} />
      <Field
        name={'remember'}
        component={CheckBoxInput}
        style={styles.checkbox}
        labelStyle={styles.checkboxLabel}
      />
      <TouchableOpacity style={styles.buttonStyle} onPress={props.handleSubmit}>
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  LoginContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    marginLeft: 40,
    marginRight: 40,
    flex: 3,
    alignSelf: 'stretch',
    paddingBottom: 20,
    paddingTop: 20,
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
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonStyle: {
    height: 35,
    borderRadius: 4,
    marginRight: 20,
    marginTop: 'auto',
    backgroundColor: 'lightskyblue',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  checkbox: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  checkboxLabel: {
    fontSize: 20,
    color: 'black',
  },
});

export default reduxForm({form: 'login'})(LoginForm);
