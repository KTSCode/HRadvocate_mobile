import React from 'react';
import {View, Text} from 'react-native';
import HeaderBar from '../headerBar/index';

const Test = props => {
  return (
    <View>
      <HeaderBar navigation={props.navigation} />
      <View
        style={{
          flex: 1,
          marginTop: 100,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text> Test </Text>
      </View>
    </View>
  );
};

export default Test;
