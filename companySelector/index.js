import React from 'react';
var {StyleSheet, View, Text, Button} = require('react-native');
import CompanyCodeForm from './companyCodeForm';

const CompanyCodePage = props => {
  return (
    <View style={styles.MyForm}>
      {props.error && <Text style={styles.Error}>Error: code not found</Text>}
      <CompanyCodeForm
        onSubmit={values => {
          props.dispatch({
            type: 'SUBMIT_CODE',
            code: values.code.toLowerCase(),
          });
        }}
      />
      <Button
        title="SKIP"
        onPress={() => {
          props.dispatch({
            type: 'SUBMIT_CODE',
            code: 'abc',
          });
        }}
      />
    </View>
  );
};

export default CompanyCodePage;
var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  Error: {
    color: 'red',
  },
});
