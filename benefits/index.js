import React from 'react';
import {View, Text, Button} from 'react-native';
//import {Toolbar} from 'react-native-material-ui';

const Benefits = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
      }}>
      <Text> Benefits Page </Text>
      <Button
        title="hi"
        onPress={() => {
          alert('hi');
        }}
      />
    </View>
  );
};

export default Benefits;
