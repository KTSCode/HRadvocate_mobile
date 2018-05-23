import React from 'react';
import {Button, View, Text, ScrollView} from 'react-native';
import PersonalForm from '../personalInformation/PersonalForm';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const Test = props => {
  return (
    <View style={{flex:1}}>
      <HeaderBar navigation={props.navigation} />
      <SectionHeader title="My Info" top="true" />
      <View style={{marginTop:10,flex:1}}>
        <PersonalForm />
      </View>
    </View>
  );
};

export default Test;
