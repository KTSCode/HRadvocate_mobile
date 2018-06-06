import React from 'react';
import {View} from 'react-native';
import PersonalForm from './PersonalForm';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const PersonalInfo = props => {
  return (
    <View style={{flex: 1}}>
      <HeaderBar navigation={props.navigation} />
      <SectionHeader title="My Info" top="true" />
      <View style={{marginTop: 10, flex: 1}}>
        <PersonalForm
          handleSubmit={value => {
            //console.log(value);
            props.screenProps.dispatch({
              type: 'UPDATE_INFO',
              payload: value,
            });
          }}
        />
      </View>
    </View>
  );
};

export default PersonalInfo;
