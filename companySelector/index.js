import React from 'react';
var {StyleSheet, View, Button, Image} = require('react-native');
import CompanyCodeForm from './companyCodeForm';
import ToastBox from '../toastBox/index';
import {Card} from 'react-native-material-ui';

const CompanyCodePage = props => {
  const HRlogo = require('../images/hradvocate.png');
  // TODO make button uniform across iOS and Android
  return (
    <View style={styles.Container}>
      <View style={{alignSelf: 'center', marginTop: 40}}>
        <Image source={HRlogo} style={{height: 120, width: 350}} />
      </View>
      <View style={styles.MyForm}>
        {props.error && (
          <ToastBox
            color="#EE3E4B"
            title="Company Code Not Found"
            text="Please Try Again"
            icon="error"
          />
        )}
        {(props.info || props.error) && (
          <ToastBox
            color="#1E98C7"
            title="Contact HR For Company Code"
            icon="info"
          />
        )}
        <Card>
          <View style={{padding: 30}}>
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
    </View>
  );
};

export default CompanyCodePage;
var styles = StyleSheet.create({
  MyForm: {
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    flex: 1,
  },
  Container: {
    backgroundColor: '#3F4952',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },

});
