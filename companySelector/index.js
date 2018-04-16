import React from 'react';
var {StyleSheet, View, Text, Button, Image} = require('react-native');
import CompanyCodeForm from './companyCodeForm';
import {Card} from 'react-native-material-ui';

const CompanyCodePage = props => {
  const HRlogo = require('../images/hradvocate.png')
  return (
    <View style={styles.MyForm}>
      <View style={{alignSelf: 'center', marginTop: 40}}>
        <Image source={HRlogo} style={{height: 120, width: 350}} />
      </View>
      {props.error &&
        <Card>
          <View style={styles.Error}>
            <View style={{padding: 5}}>
              <Text style={{fontSize: 40}}>⚠</Text>
            </View>
            <View>
              <Text style={styles.ErrorText}>Error: Company Code Not Found</Text>
              <Text style={styles.ErrorCaption}>Please Try Again</Text>
            </View>
          </View>
        </Card>
      }
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
    flexDirection: 'row',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#EE3E4B',
  },
  ErrorText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#EE3E4B',
  },
  ErrorCaption: {
    fontSize: 14,
    textAlign: 'center',
  },


  CardStyle: {
    backgroundColor: '#abc',
  },
});
