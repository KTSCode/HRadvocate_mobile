import React from 'react';
var {StyleSheet, View, Text, Button, Image} = require('react-native');
import CompanyCodeForm from './companyCodeForm';
import {Card} from 'react-native-material-ui';

const CompanyCodePage = props => {
  const HRlogo = require('../images/hradvocate.png')
  return (
    <View style={styles.MyForm}>
      {props.error && <Text style={styles.Error}>Error: code not found</Text>}
      <View style={{alignSelf: 'center', marginTop: 40}}>
        <Image source={HRlogo} style={{height: 120, width: 350}} />
      </View>
      <Card>
        <View style={{padding: 30,}}>
          <CompanyCodeForm
            onSubmit={values => {
              props.dispatch({
                type: 'SUBMIT_CODE',
                code: values.code.toLowerCase(),
              });
            }}
          />
        </View>
      </Card>
      <View style={{width: 80, marginTop: 100}}>
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
    </View>
  );
};

export default CompanyCodePage;
var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: '#3F4952',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
    flex: 1,
  },
  ButtonStyle: {
    color: 'red',
    margin: 10,
    padding: 20,
  },
  Error: {
    color: 'red',
  },
  CardStyle: {
    backgroundColor: '#abc',
  },
});
