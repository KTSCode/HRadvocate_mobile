import React from 'react';
import {View} from 'react-native';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import PersonalInformationForm from './PersonalInformationForm';


const Profile = (props) => {
  return(
    <View style={{ flex: 1 }}>
        <HeaderBar
          navigation={props.navigation}
          company={props.screenProps.company.data.name}
        />
        <SectionHeader title="Profile" top="true" />
        <PersonalInformationForm />
    </View>
  );
};

export default Profile;
