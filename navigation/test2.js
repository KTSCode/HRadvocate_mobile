import React from 'react';
import {View, Text} from 'react-native';
import HeaderBar from '../headerBar/index';

const Test = props => {
  return (
    <View>
      <HeaderBar navigation={props.navigation} />
      <View
        style={{
          marginTop: 100,
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text> Test2 </Text>
      </View>
    </View>
  );
};

export default Test;
