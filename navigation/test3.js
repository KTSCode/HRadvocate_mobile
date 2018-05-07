import React from 'react';
import {Button, View, Text} from 'react-native';
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
        <Text> Test3 </Text>
        <Button
          title="Logout"
          onPress={() => {
            props.navigation.navigate('DrawerOpen');
          }}
        />
      </View>
    </View>
  );
};

export default Test;
