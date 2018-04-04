import React from 'react';
import {TextInput, View, Text, Button} from 'react-native';
import {reduxForm, Field} from 'redux-form';

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
      />
      {formStates.filter(state => meta[state]).map(state => {
        <Text key={state}> - {state}</Text>;
      })}
    </View>
  );
};

const LoginForm = props => {
  return (
    <View>
      <Text>Username:</Text>
      <Field name={'username'} component={FieldTextInput} />
      <Text>Password:</Text>
      <Field name={'password'} component={FieldTextInput} />
      <Button title="login" onPress={props.handleSubmit} />
    </View>
  );
};

export default reduxForm({form: 'contact'})(LoginForm);
