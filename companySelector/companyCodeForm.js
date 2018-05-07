import React from 'react';
import {TextInput, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
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
      <TouchableOpacity style={styles.buttonStyle} onPress={props.handleSubmit}>
        <Text style={styles.buttonTextStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

var {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
  buttonStyle: {
    height: 35,
    borderRadius: 4,
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
});
//<Button raised primary text="submit" onPress={props.handleSubmit} />

export default reduxForm({form: 'contact'})(CompanyCodeForm);
