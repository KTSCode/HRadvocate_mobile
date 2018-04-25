import React from 'react';
import {TextInput, View, Text, Button} from 'react-native';
//import {Button} from 'react-native-material-ui';
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
        style={{height: 35, borderColor: 'gray', borderWidth: 1, marginTop: 15, marginBottom: 15, padding: 5, textAlign: 'center'}}
        underlineColorAndroid='#fff'
        autoFocus={true}
      />
      {formStates.filter(state => meta[state]).map(state => {
        <Text key={state}> - {state}</Text>;
      })}
    </View>
  );
};

const CompanyCodeForm = props => {
  return (
    <View>
      <Text style={{fontSize: 20, alignSelf: 'center'}}>Enter Company Code</Text>
      <Field name={'code'} component={FieldTextInput} />
      <Button title="submit" onPress={props.handleSubmit} />
    </View>
  );
};

//<Button raised primary text="submit" onPress={props.handleSubmit} />

export default reduxForm({form: 'contact'})(CompanyCodeForm);
